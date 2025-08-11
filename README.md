# ArmourEye - AI-Driven Penetration Testing Platform

A comprehensive security testing platform that allows users to upload Docker images and perform automated penetration testing with AI-driven decision making.

## Features

- 🔐 **Secure Authentication** - JWT-based login system
- 🐳 **Docker Image Upload** - Upload and manage Docker images for testing
- 🤖 **AI-Driven Scanning** - Intelligent vulnerability detection and exploitation
- 📊 **Real-time Monitoring** - Live logs and progress tracking
- 📋 **Comprehensive Reporting** - Detailed security assessment reports
- 🎯 **Orchestrated Testing** - Automated scan management and execution

## Quick Start

### Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ArmourEye
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Build the frontend**
   ```bash
   npm run build
   ```

4. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

5. **Start the full stack**
   ```bash
   docker compose up -d
   ```

6. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001
   - Database: localhost:5432
   - Redis: localhost:6379

### Demo Credentials

- **Admin User**: `admin` / `password`
- **Analyst User**: `analyst` / `password`

## Project Structure

```
ArmourEye/
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts (Auth)
│   └── ...
├── backend/               # Node.js API server
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── ...
├── caddy/                 # Web server configuration
├── docker-compose.yml     # Development environment
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Docker Images
- `POST /api/upload-image` - Upload Docker image
- `GET /api/images` - Get uploaded images

### Scanning
- `POST /api/scan/start` - Start a new scan
- `GET /api/scan/:scanId` - Get scan status

## Development

### Frontend Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
```

### Database
The application uses PostgreSQL for data storage. In development, it's automatically set up via Docker Compose.

## Security Features

- JWT-based authentication
- Secure file upload validation
- CORS protection
- Security headers (HSTS, CSP, etc.)
- Docker container isolation for scans

## Deployment

### Development
Use Docker Compose for local development:
```bash
docker compose up -d
```

### Production
For production deployment, follow these security guidelines:

1. **Environment Variables**
   - Set a strong `JWT_SECRET`
   - Use production database credentials
   - Configure HTTPS

2. **Network Security**
   - Deploy inside customer network/VPC
   - Use HTTPS with valid certificates
   - Implement proper firewall rules

3. **Data Protection**
   - Encrypt data at rest
   - Implement proper backup strategies
   - Set up audit logging

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Your License Here]

## Support

For support and questions, please contact [your-team-email]
