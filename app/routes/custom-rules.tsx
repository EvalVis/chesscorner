import type { Route } from "./+types/custom-rules";
import { Link } from "react-router";
import { CustomRulesDisplay } from "../components/CustomRulesDisplay";
import { LanguageToggle } from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chess Corner - Custom Rules" },
    { name: "description", content: "Add custom rules to your chess games!" },
  ];
}

export default function CustomRules() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
            <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center">
          <Link
            to="/"
            className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-gray-900 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            {t('backToHome')}
          </Link>
        </div>
        
        <div className="flex justify-center">
          <LanguageToggle />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t('customRules')}</h1>
          <CustomRulesDisplay />
        </div>
      </div>
    </div>
  );
}
