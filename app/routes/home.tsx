import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { ChessPuzzle } from "../components/ChessPuzzle";
import { CustomRulesDisplay } from "../components/CustomRulesDisplay";
import { useLanguage } from "../contexts/LanguageContext";
import { getRandomPuzzle, getRandomPuzzleByDifficulty, type PuzzleData, type DifficultyLevel } from "../utils/puzzleLoader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chess Corner - Puzzle" },
    { name: "description", content: "Solve chess puzzles and improve your game!" },
  ];
}

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-center">
          {loading ? (
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div className="text-gray-600">{t('loadingPuzzle')}</div>
            </div>
          ) : puzzleData ? (
            <ChessPuzzle 
              puzzleId={puzzleData.puzzleId}
              fen={puzzleData.fen}
              rating={puzzleData.rating}
              onDifficultySelect={loadPuzzleByDifficulty}
            />
          ) : null}
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('customRules')}</h2>
          <CustomRulesDisplay />
        </div>
      </div>
    </div>
  );
}
