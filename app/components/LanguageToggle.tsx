import { useLanguage, type Language } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex rounded-md overflow-hidden bg-gray-100 text-sm">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 font-medium transition-colors ${
          language === 'en'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('lt')}
        className={`px-2 py-1 font-medium transition-colors ${
          language === 'lt'
            ? 'bg-blue-100 text-blue-700'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        LT
      </button>
    </div>
  );
}
