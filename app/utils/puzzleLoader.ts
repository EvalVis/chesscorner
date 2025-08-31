export interface PuzzleData {
  puzzleId: string;
  fen: string;
  rating: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyRange {
  min: number;
  max: number;
}

export const DIFFICULTY_RANGES: Record<DifficultyLevel, DifficultyRange> = {
  easy: { min: 0, max: 600 },
  medium: { min: 600, max: 1600 },
  hard: { min: 1600, max: Infinity }
};

let puzzleCache: string[] | null = null;

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
      rating: parseInt(columns[1])
    };
  } catch (error) {
    console.error('Error loading puzzle:', error);
    return {
      puzzleId: "00008",
      fen: "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
      rating: 1900
    };
  }
}

export async function getRandomPuzzle(): Promise<PuzzleData> {
  const difficulties: DifficultyLevel[] = ['easy', 'medium', 'hard'];
  const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  return getRandomPuzzleByDifficulty(randomDifficulty);
}
