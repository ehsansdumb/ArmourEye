import React, { useState } from 'react';
import { Upload, Plus, Download, CheckCircle, AlertCircle, X } from 'lucide-react';

interface ImageUploadProps {
  setupData: any;
  setSetupData: (data: any) => void;
  onNext: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setupData, setSetupData, onNext }) => {
  const [registryUrl, setRegistryUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    }));

    setSetupData({
      ...setupData,
      images: [...setupData.images, ...newImages]
    });

    // Simulate upload progress
    newImages.forEach(image => {
      const interval = setInterval(() => {
        setSetupData((prev: any) => ({
          ...prev,
          images: prev.images.map((img: any) => 
            img.id === image.id 
              ? { ...img, progress: Math.min(img.progress + 10, 100) }
              : img
          )
        }));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setSetupData((prev: any) => ({
          ...prev,
          images: prev.images.map((img: any) => 
            img.id === image.id 
              ? { ...img, status: 'complete', progress: 100 }
              : img
          )
        }));
      }, 2000);
    });
  };

  const handlePullImage = () => {
    if (!registryUrl.trim()) return;

    const newImage = {
      id: Date.now(),
      name: registryUrl,
      status: 'pulling',
      progress: 0,
    };

    setSetupData({
      ...setupData,
      images: [...setupData.images, newImage]
    });

    // Simulate pull progress
    const interval = setInterval(() => {
      setSetupData((prev: any) => ({
        ...prev,
        images: prev.images.map((img: any) => 
          img.id === newImage.id 
            ? { ...img, progress: Math.min(img.progress + 5, 100) }
            : img
        )
      }));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setSetupData((prev: any) => ({
        ...prev,
        images: prev.images.map((img: any) => 
          img.id === newImage.id 
            ? { ...img, status: 'complete', progress: 100 }
            : img
        )
      }));
    }, 6000);

    setRegistryUrl('');
  };

  const removeImage = (id: number) => {
    setSetupData({
      ...setupData,
      images: setupData.images.filter((img: any) => img.id !== id)
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Upload Docker Images</h2>
        <p className="text-gray-400">Upload Dockerfiles, .tar images, or pull from a registry</p>
      </div>

      {/* File Upload Area */}
      <div className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-accent bg-accent/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-gray-400 mb-4">
            Supports Dockerfiles, .tar images, and .zip archives
          </p>
          <input
            type="file"
            multiple
            accept=".tar,.zip,.dockerfile,Dockerfile"
            onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Select Files
          </label>
        </div>

        {/* Registry Pull */}
        <div className="bg-gray-850 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Pull from Registry</h3>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="registry.example.com/image:tag"
              value={registryUrl}
              onChange={(e) => setRegistryUrl(e.target.value)}
              className="flex-1 px-4 py-2 bg-secondary border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
            />
            <button
              onClick={handlePullImage}
              disabled={!registryUrl.trim()}
              className="px-6 py-2 bg-cyan hover:bg-cyan-light disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Pull
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Images List */}
      {setupData.images.length > 0 && (
        <div className="bg-gray-850 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Uploaded Images</h3>
          <div className="space-y-3">
            {setupData.images.map((image: any) => (
              <div key={image.id} className="flex items-center space-x-4 p-3 bg-secondary rounded-lg">
                <div className="flex-shrink-0">
                  {image.status === 'complete' ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : image.status === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-error" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{image.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {image.size && (
                      <span className="text-gray-400 text-sm">{formatFileSize(image.size)}</span>
                    )}
                    <span className={`text-sm font-medium ${
                      image.status === 'complete' ? 'text-success' :
                      image.status === 'error' ? 'text-error' :
                      'text-accent'
                    }`}>
                      {image.status === 'uploading' ? 'Uploading...' :
                       image.status === 'pulling' ? 'Pulling...' :
                       image.status === 'complete' ? 'Ready' :
                       'Failed'}
                    </span>
                  </div>
                  
                  {(image.status === 'uploading' || image.status === 'pulling') && (
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-accent h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${image.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => removeImage(image.id)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-error transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ImageUpload;