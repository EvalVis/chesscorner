import type { Route } from "./+types/custom-rules";
import { CustomRulesDisplay } from "../components/CustomRulesDisplay";
import { Header } from "../components/Header";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 relative">
      <Header showNavigation />
      <div className="max-w-4xl mx-auto pt-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t('customRules')}</h1>
          <CustomRulesDisplay />
        </div>
      </div>
    </div>
  );
}
