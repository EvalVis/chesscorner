import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'lt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

type TranslationKey = 
  | 'chessPuzzle'
  | 'puzzleId'
  | 'rating'
  | 'toMove'
  | 'white'
  | 'black'
  | 'chooseDifficulty'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'newRandomPuzzle'
  | 'flipBoard'
  | 'loadingPuzzle'
  | 'language';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    chessPuzzle: 'Chess Puzzle',
    puzzleId: 'Puzzle ID',
    rating: 'Rating',
    toMove: 'To move',
    white: 'White',
    black: 'Black',
    chooseDifficulty: 'Choose Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    newRandomPuzzle: 'New Random Puzzle',
    flipBoard: 'Flip Board',
    loadingPuzzle: 'Loading puzzle...',
    language: 'Language'
  },
  lt: {
    chessPuzzle: 'Šachmatų Uždavinys',
    puzzleId: 'Uždavinio ID',
    rating: 'Reitingas',
    toMove: 'Ėjimas',
    white: 'Baltieji',
    black: 'Juodieji',
    chooseDifficulty: 'Pasirinkite sudėtingumą',
    easy: 'Lengvas',
    medium: 'Vidutinis',
    hard: 'Sunkus',
    newRandomPuzzle: 'Naujas uždavinys',
    flipBoard: 'Apsukti lentą',
    loadingPuzzle: 'Kraunamas uždavinys...',
    language: 'Kalba'
  }
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
