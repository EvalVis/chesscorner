import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { loadRules, getRandomRule, removeRuleFromList, type CustomRule } from '../utils/rulesLoader';

export function CustomRulesDisplay() {
  const { language, t } = useLanguage();
  const [availableRules, setAvailableRules] = useState<CustomRule[]>([]);
  const [displayedRules, setDisplayedRules] = useState<CustomRule[]>([]);
  const [loading, setLoading] = useState(false);

  // Load rules when language changes
  useEffect(() => {
    const loadRulesForLanguage = async () => {
      setLoading(true);
      try {
        const rules = await loadRules(language);
        setAvailableRules(rules);
        // Clear displayed rules when language changes
        setDisplayedRules([]);
      } catch (error) {
        console.error('Failed to load rules:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRulesForLanguage();
  }, [language]);

  const revealNewRule = () => {
    if (availableRules.length === 0) {
      return;
    }

    const newRule = getRandomRule(availableRules);
    if (newRule) {
      setDisplayedRules(prev => [...prev, newRule]);
      setAvailableRules(prev => removeRuleFromList(prev, newRule));
    }
  };

  const clearAllRules = () => {
    setAvailableRules(prev => [...prev, ...displayedRules].sort((a, b) => a.id - b.id));
    setDisplayedRules([]);
  };

  const deleteRule = (ruleToDelete: CustomRule) => {
    setDisplayedRules(prev => prev.filter(rule => rule.id !== ruleToDelete.id));
    setAvailableRules(prev => [...prev, ruleToDelete].sort((a, b) => a.id - b.id));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-blue-800">{t('suggestion')}</h3>
            <p className="text-sm text-blue-700 mt-1">{t('suggestionText')}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={revealNewRule}
          disabled={availableRules.length === 0}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {availableRules.length === 0 ? t('noMoreRules') : `${t('revealNewRule')} (${availableRules.length} ${t('left')})`}
        </button>
        
        {displayedRules.length > 0 && (
          <button
            onClick={clearAllRules}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {t('clearAllRules')}
          </button>
        )}
      </div>

      {displayedRules.length > 0 && (
        <div className="grid gap-3 max-w-4xl mx-auto">
          {displayedRules.map((rule, index) => (
            <div
              key={`${rule.id}-${index}`}
              className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 shadow-sm relative"
            >
              <button
                onClick={() => deleteRule(rule)}
                className="absolute top-2 right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200"
                title="Delete rule"
              >
                X
              </button>
              <p className="text-gray-800 font-medium leading-relaxed pr-8">{rule.text}</p>
            </div>
          ))}
        </div>
      )}


    </div>
  );
}
