import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalInfo from './steps/PersonalInfo';
import ContactDetails from './steps/ContactDetails';
import Preferences from './steps/Preferences';
import Review from './steps/Review';

const steps = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfo },
  { id: 'contact', title: 'Contact Details', component: ContactDetails }, 
  { id: 'preferences', title: 'Preferences', component: Preferences },
  { id: 'review', title: 'Review & Submit', component: Review }
];

export type FormData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    birthDate: string;
  };
  contactDetails: {
    email: string;
    phone: string;
    address: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    newsletter: boolean;
  };
};

export default function WizardForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: { firstName: '', lastName: '', birthDate: '' },
    contactDetails: { email: '', phone: '', address: '' },
    preferences: { theme: 'light', notifications: true, newsletter: false }
  });

  const updateFormData = (stepId: string, data: any) => {
    setFormData(prev => ({ ...prev, [stepId]: data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              className={`flex items-center ${idx < currentStep ? 'text-purple-600' : 'text-gray-400'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${idx <= currentStep ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}>
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={`w-full h-1 mx-2 ${idx < currentStep ? 'bg-purple-600' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span key={step.id} className="text-sm text-gray-600">{step.title}</span>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <StepComponent 
            formData={formData[steps[currentStep].id as keyof FormData]}
            updateFormData={(data: any) => updateFormData(steps[currentStep].id, data)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}