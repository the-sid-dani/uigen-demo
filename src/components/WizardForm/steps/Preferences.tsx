type PreferencesData = {
  theme: 'light' | 'dark';
  notifications: boolean;
  newsletter: boolean;
};

type Props = {
  formData: PreferencesData;
  updateFormData: (data: PreferencesData) => void;
};

export default function Preferences({ formData, updateFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    updateFormData({ ...formData, [name]: newValue });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Your Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={formData.theme === 'light'}
                onChange={handleChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2">Light Mode</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={formData.theme === 'dark'}
                onChange={handleChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2">Dark Mode</span>
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">Enable Notifications</label>
            <p className="text-gray-500">Receive updates about your account activity</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">Subscribe to Newsletter</label>
            <p className="text-gray-500">Get weekly news and updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}