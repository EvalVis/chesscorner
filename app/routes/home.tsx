import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { ChessPuzzle } from "../components/ChessPuzzle";
import { getRandomPuzzle, getRandomPuzzleByDifficulty, type PuzzleData, type DifficultyLevel } from "../utils/puzzleLoader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chess Corner - Puzzle" },
    { name: "description", content: "Solve chess puzzles and improve your game!" },
  ];
}

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {loading ? (
        <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-gray-600">Loading puzzle...</div>
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
  );
}
