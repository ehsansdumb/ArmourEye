const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// In-memory user storage (replace with database later)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    role: 'admin'
  },
  {
    id: 2,
    username: 'analyst',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    role: 'analyst'
  }
];

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 // 1GB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow Docker image files
    if (file.mimetype === 'application/x-tar' || 
        file.originalname.match(/\.(tar|tar\.gz|zip)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Only Docker image files (.tar, .tar.gz, .zip) are allowed!'), false);
    }
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token endpoint
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Upload Docker image endpoint
app.post('/api/upload-image', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Here you would typically:
    // 1. Save file metadata to database
    // 2. Optionally run docker load to import the image
    // 3. Return success response

    res.json({
      message: 'Image uploaded successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get uploaded images
app.get('/api/images', authenticateToken, (req, res) => {
  // Mock response - replace with database query
  res.json([
    {
      id: 1,
      name: 'web-app.tar',
      size: '256MB',
      uploadedAt: new Date().toISOString(),
      status: 'ready'
    }
  ]);
});

// Start scan endpoint
app.post('/api/scan/start', authenticateToken, (req, res) => {
  try {
    const { imageId, profile } = req.body;
    
    // Mock scan start - replace with actual scan logic
    const scanId = Date.now();
    
    res.json({
      message: 'Scan started',
      scanId,
      status: 'running'
    });
  } catch (error) {
    console.error('Scan start error:', error);
    res.status(500).json({ error: 'Failed to start scan' });
  }
});

// Get scan status
app.get('/api/scan/:scanId', authenticateToken, (req, res) => {
  const { scanId } = req.params;
  
  // Mock response - replace with actual scan status
  res.json({
    scanId,
    status: 'running',
    progress: 65,
    message: 'Scanning target containers'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 