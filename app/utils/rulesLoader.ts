import type { Language } from '../contexts/LanguageContext';

export interface CustomRule {
  id: number;
  text: string;
}

let rulesCache: Record<Language, CustomRule[]> = {
  en: [],
  lt: []
};

export async function loadRules(language: Language): Promise<CustomRule[]> {
  if (rulesCache[language].length > 0) {
    return rulesCache[language];
  }

  try {
    const response = await fetch(`/custom_rules/${language}.txt`);
    if (!response.ok) {
      throw new Error(`Failed to load rules for ${language}`);
    }
    
    const text = await response.text();
    const lines = text.trim().split('\n');
    
    const rules: CustomRule[] = lines.map((line, index) => ({
      id: index + 1,
      text: line.trim()
    })).filter(rule => rule.text.length > 0);
    
    rulesCache[language] = rules;
    return rules;
  } catch (error) {
    console.error(`Error loading rules for ${language}:`, error);
    return [];
  }
}

export function getRandomRule(availableRules: CustomRule[]): CustomRule | null {
  if (availableRules.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableRules.length);
  return availableRules[randomIndex];
}

export function removeRuleFromList(rules: CustomRule[], ruleToRemove: CustomRule): CustomRule[] {
  return rules.filter(rule => rule.id !== ruleToRemove.id);
}
