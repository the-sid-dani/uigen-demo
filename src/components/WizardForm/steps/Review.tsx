import { motion } from 'framer-motion';
import type { FormData } from '../WizardForm';

type Props = {
  formData: FormData;
};

const ReviewSection = ({ title, data }: { title: string; data: Record<string, any> }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <div className="bg-gray-50 rounded-lg p-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between py-2">
          <span className="text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          <span className="font-medium">
            {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value.toString()}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function Review({ formData }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Review Your Information</h2>
      
      <ReviewSection title="Personal Information" data={formData.personalInfo} />
      <ReviewSection title="Contact Details" data={formData.contactDetails} />
      <ReviewSection title="Preferences" data={formData.preferences} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center text-gray-600"
      >
        Please review your information carefully before submitting
      </motion.div>
    </div>
  );
}