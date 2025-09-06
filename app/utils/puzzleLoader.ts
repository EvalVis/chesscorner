export interface PuzzleData {
  puzzleId: string;
  fen: string;
  rating: number;
  themes: string[];
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyRange {
  min: number;
  max: number;
}

function getDifficultyRanges(): Record<DifficultyLevel, DifficultyRange> {
  const easyMin = parseInt(import.meta.env.VITE_EASY_MIN_RATING) || 0;
  const easyMax = parseInt(import.meta.env.VITE_EASY_MAX_RATING) || 600;
  const mediumMin = parseInt(import.meta.env.VITE_MEDIUM_MIN_RATING) || 600;
  const mediumMax = parseInt(import.meta.env.VITE_MEDIUM_MAX_RATING) || 1600;
  const hardMin = parseInt(import.meta.env.VITE_HARD_MIN_RATING) || 1600;
  const hardMax = parseInt(import.meta.env.VITE_HARD_MAX_RATING) || 9999;

  return {
    easy: { min: easyMin, max: easyMax },
    medium: { min: mediumMin, max: mediumMax },
    hard: { min: hardMin, max: hardMax === 9999 ? Infinity : hardMax }
  };
}

export const DIFFICULTY_RANGES = getDifficultyRanges();

let puzzleCache: string[] | null = null;
let allThemes: string[] | null = null;

async function loadPuzzleData(): Promise<string[]> {
  if (puzzleCache) {
    return puzzleCache;
  }

  try {
    const response = await fetch('/puzzles/lichess_db_puzzle.csv');
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    puzzleCache = lines.slice(1).filter(line => line.trim() !== '');
    return puzzleCache;
  } catch (error) {
    console.error('Error loading puzzle data:', error);
    throw error;
  }
}

export async function getAllThemes(): Promise<string[]> {
  if (allThemes) {
    return allThemes;
  }

  try {
    const puzzles = await loadPuzzleData();
    const themeSet = new Set<string>();
    
    puzzles.forEach(line => {
      const columns = line.split(',');
      if (columns.length > 7) {
        const themes = columns[7].split(' ').filter(theme => theme.trim() !== '');
        themes.forEach(theme => themeSet.add(theme));
      }
    });

    allThemes = Array.from(themeSet).sort();
    return allThemes;
  } catch (error) {
    console.error('Error loading themes:', error);
    return [];
  }
}

export async function getThemesForDifficulty(difficulty: DifficultyLevel): Promise<string[]> {
  try {
    const puzzles = await loadPuzzleData();
    const range = DIFFICULTY_RANGES[difficulty];
    const themeSet = new Set<string>();
    
    puzzles.forEach(line => {
      const columns = line.split(',');
      const rating = parseInt(columns[1]);
      
      if (rating >= range.min && rating < range.max && columns.length > 7) {
        const themes = columns[7].split(' ').filter(theme => theme.trim() !== '');
        themes.forEach(theme => themeSet.add(theme));
      }
    });

    return Array.from(themeSet).sort();
  } catch (error) {
    console.error('Error loading themes for difficulty:', error);
    return [];
  }
}

export async function getRandomPuzzleByTheme(theme: string, difficulty?: DifficultyLevel): Promise<PuzzleData> {
  try {
    const puzzles = await loadPuzzleData();
    
    let filteredPuzzles = puzzles.filter(line => {
      const columns = line.split(',');
      if (columns.length > 7) {
        const themes = columns[7].split(' ');
        return themes.includes(theme);
      }
      return false;
    });

    if (difficulty) {
      const range = DIFFICULTY_RANGES[difficulty];
      filteredPuzzles = filteredPuzzles.filter(line => {
        const columns = line.split(',');
        const rating = parseInt(columns[1]);
        return rating >= range.min && rating < range.max;
      });
    }

    if (filteredPuzzles.length === 0) {
      throw new Error(`No puzzles found for theme: ${theme}${difficulty ? ` and difficulty: ${difficulty}` : ''}`);
    }

    const randomIndex = Math.floor(Math.random() * filteredPuzzles.length);
    const randomLine = filteredPuzzles[randomIndex];
    const columns = randomLine.split(',');
    
    return {
      puzzleId: columns[0],
      fen: columns[2],
      rating: parseInt(columns[1]),
      themes: columns[7].split(' ').filter(theme => theme.trim() !== '')
    };
  } catch (error) {
    console.error('Error loading puzzle by theme:', error);
    return {
      puzzleId: "00008",
      fen: "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
      rating: 1900,
      themes: ['mate', 'mateIn1']
    };
  }
}

export async function getRandomPuzzleByDifficulty(difficulty: DifficultyLevel): Promise<PuzzleData> {
  try {
    const puzzles = await loadPuzzleData();
    const range = DIFFICULTY_RANGES[difficulty];
    
    const filteredPuzzles = puzzles.filter(line => {
      const columns = line.split(',');
      const rating = parseInt(columns[1]);
      return rating >= range.min && rating < range.max;
    });

    if (filteredPuzzles.length === 0) {
      throw new Error(`No puzzles found for difficulty: ${difficulty}`);
    }

    const randomIndex = Math.floor(Math.random() * filteredPuzzles.length);
    const randomLine = filteredPuzzles[randomIndex];
    const columns = randomLine.split(',');
    
    return {
      puzzleId: columns[0],
      fen: columns[2],
      rating: parseInt(columns[1]),
      themes: columns[7] ? columns[7].split(' ').filter(theme => theme.trim() !== '') : []
    };
  } catch (error) {
    console.error('Error loading puzzle:', error);
    return {
      puzzleId: "00008",
      fen: "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
      rating: 1900,
      themes: ['mate', 'mateIn1']
    };
  }
}

export async function getRandomPuzzle(): Promise<PuzzleData> {
  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard'];
  const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  return getRandomPuzzleByDifficulty(randomDifficulty);
}
