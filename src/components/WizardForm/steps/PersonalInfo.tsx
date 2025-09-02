import { useState, useEffect } from 'react';

type PersonalInfoData = {
  firstName: string;
  lastName: string;
  birthDate: string;
};

type Props = {
  formData: PersonalInfoData;
  updateFormData: (data: PersonalInfoData) => void;
};

export default function PersonalInfo({ formData, updateFormData }: Props) {
  const [errors, setErrors] = useState<Partial<PersonalInfoData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    updateFormData(updatedData);
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      
      switch (name) {
        case 'firstName':
        case 'lastName':
          if (!value.trim()) {
            newErrors[name as keyof PersonalInfoData] = 'This field is required';
          } else if (value.length < 2) {
            newErrors[name as keyof PersonalInfoData] = 'Must be at least 2 characters';
          } else {
            delete newErrors[name as keyof PersonalInfoData];
          }
          break;
          
        case 'birthDate':
          if (!value) {
            newErrors.birthDate = 'This field is required';
          } else {
            const date = new Date(value);
            const now = new Date();
            if (date > now) {
              newErrors.birthDate = 'Date cannot be in the future';
            } else {
              delete newErrors.birthDate;
            }
          }
          break;
      }
      
      return newErrors;
    });
  };

  useEffect(() => {
    Object.entries(formData).forEach(([name, value]) => {
      validateField(name, value);
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
            errors.firstName ? 'border-red-300' : ''
          }`}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
            errors.lastName ? 'border-red-300' : ''
          }`}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
            errors.birthDate ? 'border-red-300' : ''
          }`}
        />
        {errors.birthDate && (
          <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
        )}
      </div>
    </div>
  );
}