'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/api';
import { toast } from 'react-hot-toast';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface StepProps {
  data: SignupData;
  onNext: (field: keyof SignupData, value: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  setSignupData: React.Dispatch<React.SetStateAction<SignupData>>;
}

const Step1FirstName: React.FC<StepProps> = ({ data, onNext, currentStep, totalSteps }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">What's your first name?</h2>
      <p className="mt-2 text-gray-600">We'll use this to personalize your experience</p>
    </div>
    
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter your first name"
        value={data.firstName}
        onChange={(e) => {
          const newData = { ...data, firstName: e.target.value };
          setSignupData(newData);
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && data.firstName.trim() && onNext('firstName', data.firstName)}
      />
      
      <button
        onClick={() => data.firstName.trim() && onNext('firstName', data.firstName)}
        disabled={!data.firstName.trim()}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
    
    <div className="text-center text-sm text-gray-500">
      Step {currentStep} of {totalSteps}
    </div>
  </div>
);

const Step2LastName: React.FC<StepProps> = ({ data, onNext, onBack, currentStep, totalSteps }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">What's your last name?</h2>
      <p className="mt-2 text-gray-600">This helps us identify you in the system</p>
    </div>
    
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter your last name"
        value={data.lastName}
        onChange={(e) => {
          const newData = { ...data, lastName: e.target.value };
          setSignupData(newData);
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && data.lastName.trim() && onNext('lastName', data.lastName)}
      />
      
      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => data.lastName.trim() && onNext('lastName', data.lastName)}
          disabled={!data.lastName.trim()}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
    
    <div className="text-center text-sm text-gray-500">
      Step {currentStep} of {totalSteps}
    </div>
  </div>
);

const Step3Email: React.FC<StepProps> = ({ data, onNext, onBack, currentStep, totalSteps }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">What's your email address?</h2>
      <p className="mt-2 text-gray-600">We'll send you important updates and notifications</p>
    </div>
    
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email address"
        value={data.email}
        onChange={(e) => {
          const newData = { ...data, email: e.target.value };
          setSignupData(newData);
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && data.email.trim() && onNext('email', data.email)}
      />
      
      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => data.email.trim() && onNext('email', data.email)}
          disabled={!data.email.trim()}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
    
    <div className="text-center text-sm text-gray-500">
      Step {currentStep} of {totalSteps}
    </div>
  </div>
);

const Step4Phone: React.FC<StepProps> = ({ data, onNext, onBack, currentStep, totalSteps }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">What's your phone number?</h2>
      <p className="mt-2 text-gray-600">For delivery updates and account security</p>
    </div>
    
    <div className="space-y-4">
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={data.phone}
        onChange={(e) => {
          const newData = { ...data, phone: e.target.value };
          setSignupData(newData);
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && data.phone.trim() && onNext('phone', data.phone)}
      />
      
      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => data.phone.trim() && onNext('phone', data.phone)}
          disabled={!data.phone.trim()}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
    
    <div className="text-center text-sm text-gray-500">
      Step {currentStep} of {totalSteps}
    </div>
  </div>
);

const Step5Password: React.FC<StepProps> = ({ data, onNext, onBack, currentStep, totalSteps }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">Create a secure password</h2>
      <p className="mt-2 text-gray-600">Choose a strong password to protect your account</p>
    </div>
    
    <div className="space-y-4">
      <input
        type="password"
        placeholder="Enter your password"
        value={data.password}
        onChange={(e) => {
          const newData = { ...data, password: e.target.value };
          setSignupData(newData);
        }}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && data.password.trim() && onNext('password', data.password)}
      />
      
      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => data.password.trim() && onNext('password', data.password)}
          disabled={!data.password.trim()}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
    
    <div className="text-center text-sm text-gray-500">
      Step {currentStep} of {totalSteps}
    </div>
  </div>
);

const Step6Review: React.FC<StepProps> = ({ data, onBack, currentStep, totalSteps }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.register(data);
      if (response.success) {
        toast.success('Account created successfully!');
        // Auto-login after successful registration
        const loginResponse = await apiClient.login({
          email: data.email,
          password: data.password
        });
        
        if (loginResponse.success && loginResponse.data?.accessToken) {
          localStorage.setItem('accessToken', loginResponse.data.accessToken);
          router.push('/dashboard');
        } else {
          router.push('/signin');
        }
      } else {
        toast.error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Review Your Information</h2>
        <p className="mt-2 text-gray-600">Please review your details before creating your account</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">First Name:</span>
          <span className="text-gray-900">{data.firstName}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Last Name:</span>
          <span className="text-gray-900">{data.lastName}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-900">{data.email}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Phone:</span>
          <span className="text-gray-900">{data.phone}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-medium text-gray-700">Password:</span>
          <span className="text-gray-900">••••••••</span>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

const MultiStepSignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });

  const totalSteps = 6;

  const handleNext = (field: keyof SignupData, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1FirstName data={signupData} onNext={handleNext} onBack={handleBack} currentStep={currentStep} totalSteps={totalSteps} setSignupData={setSignupData} />;
      case 2:
        return <Step2LastName data={signupData} onNext={handleNext} onBack={handleBack} currentStep={currentStep} totalSteps={totalSteps} setSignupData={setSignupData} />;
      case 3:
        return <Step3Email data={signupData} onNext={handleNext} onBack={handleBack} currentStep={currentStep} totalSteps={totalSteps} setSignupData={setSignupData} />;
      case 4:
        return <Step4Phone data={signupData} onNext={handleNext} onBack={handleBack} currentStep={currentStep} totalSteps={totalSteps} setSignupData={setSignupData} />;
      case 5:
        return <Step5Password data={signupData} onNext={handleNext} onBack={handleBack} currentStep={currentStep} totalSteps={totalSteps} setSignupData={setSignupData} />;
      case 6:
        return <Step6Review data={signupData} onNext={handleNext} onBack={handleBack} currentStep={currentStep} totalSteps={totalSteps} setSignupData={setSignupData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h1>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default MultiStepSignupForm;
