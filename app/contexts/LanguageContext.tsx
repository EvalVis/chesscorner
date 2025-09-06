import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'lt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  translateTheme: (theme: string) => string;
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
  | 'language'
  | 'customRules'
  | 'revealNewRule'
  | 'clearAllRules'
  | 'noMoreRules'
  | 'left'
  | 'backToHome'
  | 'chessCorner'
  | 'chessPuzzlesTitle'
  | 'chessPuzzlesDescription'
  | 'customRulesTitle'
  | 'customRulesDescription'
  | 'suggestion'
  | 'suggestionText'
  | 'chooseTheme';

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
    language: 'Language',
    customRules: 'Custom Rules',
    revealNewRule: 'Reveal New Rule',
    clearAllRules: 'Clear All Rules',
    noMoreRules: 'No More Rules',
    left: 'left',
    backToHome: '← Back to Home',
    chessCorner: 'Chess Corner',
    chessPuzzlesTitle: 'Chess Puzzles',
    chessPuzzlesDescription: 'Solve tactical puzzles of varying difficulty levels to sharpen your chess skills',
    customRulesTitle: 'Custom Rules',
    customRulesDescription: 'Discover fun and challenging rule variants to spice up your chess games',
    suggestion: 'Suggestion',
    suggestionText: 'Reveal one card each turn',
    chooseTheme: 'Choose Theme'
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
    language: 'Kalba',
    customRules: 'Papildomos taisyklės',
    revealNewRule: 'Rodyti papildomą taisyklę',
    clearAllRules: 'Panaikinti visas rodomas taisykles',
    noMoreRules: 'Daugiau taisyklių nėra',
    left: 'liko',
    backToHome: '← Grįžti į pradžią',
    chessCorner: 'Šachmatų kampelis',
    chessPuzzlesTitle: 'Šachmatų uždaviniai',
    chessPuzzlesDescription: 'Spręskite taktinius uždavinius skirtingų sunkumo lygių, siekdami patobulinti šachmatų įgūdžius',
    customRulesTitle: 'Papildomos taisyklės',
    customRulesDescription: 'Atraskite smagias ir iššūkius keliančias taisyklių variacijas šachmatų žaidimams',
    suggestion: 'Pasiūlymas',
    suggestionText: 'Atverskite po vieną kortelę kiekvieno ėjimo metu',
    chooseTheme: 'Pasirinkite temą'
  }
};

const themeTranslations: Record<Language, Record<string, string>> = {
  en: {
    master: 'Master play',
    rookEndgame: 'Rook endgame',
    defensiveMove: 'Defensive move',
    mate: 'Mate',
    mateIn1: 'Mate in 1',
    mateIn2: 'Mate in 2',
    mateIn3: 'Mate in 3',
    mateIn4: 'Mate in 4',
    mateIn5: 'Mate in 5',
    endgame: 'Endgame',
    middlegame: 'Middlegame',
    opening: 'Opening',
    tactics: 'Tactics',
    puzzle: 'Puzzle',
    gameEnding: 'Game Ending',
    short: 'Short',
    long: 'Long',
    veryLong: 'Very Long',
    oneMove: 'One Move',
    crushing: 'Crushing',
    advantage: 'Advantage',
    equality: 'Equality',
    fork: 'Fork',
    pin: 'Pin',
    skewer: 'Skewer',
    discoveredAttack: 'Discovered Attack',
    doubleCheck: 'Double Check',
    sacrifice: 'Sacrifice',
    deflection: 'Deflection',
    attraction: 'Attraction',
    clearance: 'Clearance',
    zwischenzug: 'Zwischenzug',
    quietMove: 'Quiet Move',
    xRayAttack: 'X-Ray Attack',
    promotion: 'Promotion',
    underPromotion: 'Under Promotion',
    castling: 'Castling',
    enPassant: 'En Passant',
    capturingDefender: 'Capturing Defender',
    attackingF2F7: 'Attacking f2/f7',
    doubleAttack: 'Double Attack',
    trappedPiece: 'Trapped Piece',
    hangingPiece: 'Hanging Piece',
    kingsideAttack: 'Kingside Attack',
    queensideAttack: 'Queenside Attack',
    backRankMate: 'Back Rank Mate',
    smotheredMate: 'Smothered Mate',
    arabianMate: 'Arabian Mate',
    anastasiaMate: 'Anastasia Mate',
    bodenMate: 'Boden Mate',
    doubleBishopMate: 'Double Bishop Mate',
    dovetailMate: 'Dovetail Mate',
    hookMate: 'Hook Mate'
  },
  lt: {
    master: 'Meistrų žaidimas',
    rookEndgame: 'Bokštų endšpilis',
    defensiveMove: 'Gynybinis ėjimas',
    mate: 'Matas',
    mateIn1: 'Matas 1 ėjimu',
    mateIn2: 'Matas 2 ėjimais',
    mateIn3: 'Matas 3 ėjimais',
    mateIn4: 'Matas 4 ėjimais',
    mateIn5: 'Matas 5 ėjimais',
    endgame: 'Endšpilis',
    middlegame: 'Viduržaidis',
    opening: 'Debiutas',
    tactics: 'Taktika',
    puzzle: 'Uždavinys',
    gameEnding: 'Partijos pabaiga',
    short: 'Trumpas uždavinys',
    long: 'Ilgas uždavinys',
    veryLong: 'Labai ilgas uždavinys',
    oneMove: 'Vieno ėjimo uždavinys',
    crushing: 'Sutriuškinimas',
    advantage: 'Pranašumas',
    equality: 'Lygybė',
    fork: 'Šakutė',
    pin: 'Prispaudimas',
    skewer: 'Iešmas',
    discoveredAttack: 'Atskleista ataka',
    doubleCheck: 'Dvigubas šachas',
    sacrifice: 'Auka',
    deflection: 'Nukreipimas',
    attraction: 'Pritraukimas',
    clearance: 'Išvalymas',
    zwischenzug: 'Tarpinis ėjimas',
    quietMove: 'Tylus ėjimas',
    xRayAttack: 'Rentgeno ataka',
    promotion: 'Paaukštinimas',
    underPromotion: 'Nevisavertis paaukštinimas',
    castling: 'Rokiruotė',
    enPassant: 'Pėstininko kirtis',
    capturingDefender: 'Gynėjo ėmimas',
    attackingF2F7: 'Puolimas f2/f7',
    doubleAttack: 'Dvigubas puolimas',
    trappedPiece: 'Užspausta figūra',
    hangingPiece: 'Kabanti figūra',
    kingsideAttack: 'Puolimas karaliaus pusėje',
    queensideAttack: 'Puolimas valdovės pusėje',
    backRankMate: 'Paskutinės eilės matas',
    smotheredMate: 'Uždusintasis matas',
    arabianMate: 'Arabiškas matas',
    anastasiaMate: 'Anastasijos matas',
    bodenMate: 'Bodeno matas',
    doubleBishopMate: 'Dviejų rikių matas',
    dovetailMate: 'Kregždės uodegos matas',
    hookMate: 'Kabliuko matas'
  }
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const translateTheme = (theme: string): string => {
    return themeTranslations[language][theme] || theme;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateTheme }}>
      {children}
    </LanguageContext.Provider>
  );
}
