import type { Route } from "./+types/puzzles";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChessPuzzle } from "../components/ChessPuzzle";
import { LanguageToggle } from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { getRandomPuzzle, getRandomPuzzleByDifficulty, getRandomPuzzleByTheme, type PuzzleData, type DifficultyLevel } from "../utils/puzzleLoader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chess Corner - Puzzles" },
    { name: "description", content: "Solve chess puzzles and improve your game!" },
  ];
}

export default function Puzzles() {
  const { t } = useLanguage();
  const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPuzzleByDifficulty = async (difficulty: DifficultyLevel) => {
    setLoading(true);
    try {
      const newPuzzle = await getRandomPuzzleByDifficulty(difficulty);
      setPuzzleData(newPuzzle);
    } catch (error) {
      console.error('Failed to load puzzle:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPuzzleByTheme = async (theme: string) => {
    setLoading(true);
    try {
      const newPuzzle = await getRandomPuzzleByTheme(theme);
      setPuzzleData(newPuzzle);
    } catch (error) {
      console.error('Failed to load puzzle by theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialPuzzle = async () => {
    setLoading(true);
    try {
      const newPuzzle = await getRandomPuzzle();
      setPuzzleData(newPuzzle);
    } catch (error) {
      console.error('Failed to load initial puzzle:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialPuzzle();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 space-y-6">
      <div className="flex justify-center">
        <Link
          to="/"
          className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-gray-900 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          {t('backToHome')}
        </Link>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-gray-600">{t('loadingPuzzle')}</div>
        </div>
      ) : puzzleData ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <LanguageToggle />
          </div>
          <ChessPuzzle 
            puzzleId={puzzleData.puzzleId}
            fen={puzzleData.fen}
            rating={puzzleData.rating}
            themes={puzzleData.themes}
            onDifficultySelect={loadPuzzleByDifficulty}
            onThemeSelect={loadPuzzleByTheme}
          />
        </div>
      ) : null}
    </div>
  );
}
