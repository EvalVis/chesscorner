import { useLanguage, type Language } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex rounded-xl overflow-hidden bg-white border-2 border-gray-200 shadow-lg">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-4 py-2 font-bold text-base transition-all duration-300 transform ${
          language === 'en'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:scale-102'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('lt')}
        className={`px-4 py-2 font-bold text-base transition-all duration-300 transform ${
          language === 'lt'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:scale-102'
        }`}
      >
        LT
      </button>
    </div>
  );
}
