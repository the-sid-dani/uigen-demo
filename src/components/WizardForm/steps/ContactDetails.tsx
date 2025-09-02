import { useState, useEffect } from 'react';

type ContactDetailsData = {
  email: string;
  phone: string;
  address: string;
};

type Props = {
  formData: ContactDetailsData;
  updateFormData: (data: ContactDetailsData) => void;
};

export default function ContactDetails({ formData, updateFormData }: Props) {
  const [errors, setErrors] = useState<Partial<ContactDetailsData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    updateFormData(updatedData);
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      
      switch (name) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value.trim()) {
            newErrors.email = 'Email is required';
          } else if (!emailRegex.test(value)) {
            newErrors.email = 'Please enter a valid email';
          } else {
            delete newErrors.email;
          }
          break;
          
        case 'phone':
          const phoneRegex = /^\+?[\d\s-]{10,}$/;
          if (!value.trim()) {
            newErrors.phone = 'Phone number is required';
          } else if (!phoneRegex.test(value)) {
            newErrors.phone = 'Please enter a valid phone number';
          } else {
            delete newErrors.phone;
          }
          break;
          
        case 'address':
          if (!value.trim()) {
            newErrors.address = 'Address is required';
          } else if (value.length < 10) {
            newErrors.address = 'Please enter a complete address';
          } else {
            delete newErrors.address;
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
      <h2 className="text-2xl font-semibold text-gray-800">Contact Details</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
            errors.email ? 'border-red-300' : ''
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
            errors.phone ? 'border-red-300' : ''
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
            errors.address ? 'border-red-300' : ''
          }`}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>
    </div>
  );
}