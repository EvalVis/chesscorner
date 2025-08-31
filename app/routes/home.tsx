import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import { ChessPuzzle } from "../components/ChessPuzzle";
import { getRandomPuzzle, type PuzzleData } from "../utils/puzzleLoader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chess Corner - Puzzle" },
    { name: "description", content: "Solve chess puzzles and improve your game!" },
  ];
}

export default function Home() {
  const [puzzleData, setPuzzleData] = useState<PuzzleData>({
    puzzleId: "00008",
    fen: "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
    rating: 1900
  });
  const [loading, setLoading] = useState(false);

  const loadRandomPuzzle = async () => {
    setLoading(true);
    try {
      const newPuzzle = await getRandomPuzzle();
      setPuzzleData(newPuzzle);
    } catch (error) {
      console.error('Failed to load random puzzle:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomPuzzle();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {loading ? (
        <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="text-gray-600">Loading puzzle...</div>
        </div>
      ) : (
        <ChessPuzzle 
          puzzleId={puzzleData.puzzleId}
          fen={puzzleData.fen}
          rating={puzzleData.rating}
          onNewPuzzle={loadRandomPuzzle}
        />
      )}
    </div>
  );
}
