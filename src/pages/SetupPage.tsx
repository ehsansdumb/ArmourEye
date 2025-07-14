import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import ImageUpload from '../components/setup/ImageUpload';
import NetworkConfig from '../components/setup/NetworkConfig';
import ContainerPlacement from '../components/setup/ContainerPlacement';
import ReviewLaunch from '../components/setup/ReviewLaunch';

const SetupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({
    images: [],
    networkConfig: { type: 'single', networks: [] },
    containerPlacements: [],
  });

  const steps = [
    { id: 1, title: 'Image Upload', description: 'Upload Docker images or pull from registry' },
    { id: 2, title: 'Network Configuration', description: 'Configure network topology' },
    { id: 3, title: 'Container Placement', description: 'Configure container settings' },
    { id: 4, title: 'Review & Launch', description: 'Review settings and launch environment' },
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ImageUpload setupData={setupData} setSetupData={setSetupData} onNext={nextStep} />;
      case 2:
        return <NetworkConfig setupData={setupData} setSetupData={setSetupData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <ContainerPlacement setupData={setupData} setSetupData={setSetupData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <ReviewLaunch setupData={setupData} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Setup Wizard</h1>
        <p className="text-gray-400">Configure your penetration testing environment</p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-secondary rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  currentStep > step.id
                    ? 'bg-success border-success text-white'
                    : currentStep === step.id
                    ? 'bg-accent border-accent text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 max-w-24">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-px mx-4 ${
                  currentStep > step.id ? 'bg-success' : 'bg-gray-600'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-secondary rounded-xl border border-gray-700 p-8">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default SetupPage;