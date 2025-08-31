import type { Route } from "./+types/home";
import { ChessPuzzle } from "../components/ChessPuzzle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Chess Corner - Puzzle" },
    { name: "description", content: "Solve chess puzzles and improve your game!" },
  ];
}

export default function Home() {
  const puzzleData = {
    puzzleId: "00008",
    fen: "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
    rating: 1900
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <ChessPuzzle 
        puzzleId={puzzleData.puzzleId}
        fen={puzzleData.fen}
        rating={puzzleData.rating}
      />
    </div>
  );
}
