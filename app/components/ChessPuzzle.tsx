import { ChessBoard } from './ChessBoard';
import { type DifficultyLevel, DIFFICULTY_RANGES } from '../utils/puzzleLoader';

interface ChessPuzzleProps {
  puzzleId: string;
  fen: string;
  rating: number;
  onNewPuzzle?: () => void;
  onDifficultySelect?: (difficulty: DifficultyLevel) => void;
}

function getActivePlayer(fen: string): 'White' | 'Black' {
  const parts = fen.split(' ');
  return parts[1] === 'w' ? 'White' : 'Black';
}

function getDifficultyLabel(rating: number): string {
  if (rating < 600) return 'Easy';
  if (rating < 1600) return 'Medium';
  return 'Hard';
}

function getDifficultyColor(rating: number): string {
  if (rating < 600) return 'text-green-600';
  if (rating < 1600) return 'text-yellow-600';
  return 'text-red-600';
}

export function ChessPuzzle({ puzzleId, fen, rating, onNewPuzzle, onDifficultySelect }: ChessPuzzleProps) {
  const activePlayer = getActivePlayer(fen);
  const difficultyLabel = getDifficultyLabel(rating);
  const difficultyColor = getDifficultyColor(rating);
  
  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Chess Puzzle</h2>
        <div className="flex flex-col space-y-1 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Puzzle ID:</span> {puzzleId}
          </div>
          <div>
            <span className="font-semibold">Rating:</span> {rating} 
            <span className={`ml-2 font-bold ${difficultyColor}`}>({difficultyLabel})</span>
          </div>
          <div>
            <span className="font-semibold">To move:</span> 
            <span className={`ml-1 font-bold ${activePlayer === 'White' ? 'text-gray-700' : 'text-gray-900'}`}>
              {activePlayer}
            </span>
          </div>
        </div>
      </div>
      
      <ChessBoard fen={fen} />
      
      {onDifficultySelect && (
        <div className="flex flex-col items-center space-y-4 w-full">
          <h3 className="text-lg font-semibold text-gray-800">Choose Difficulty</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => onDifficultySelect('easy')}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex flex-col items-center min-w-[120px]"
            >
              <span className="font-bold">Easy</span>
              <span className="text-sm opacity-90">0-600</span>
            </button>
            <button
              onClick={() => onDifficultySelect('medium')}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex flex-col items-center min-w-[120px]"
            >
              <span className="font-bold">Medium</span>
              <span className="text-sm opacity-90">600-1600</span>
            </button>
            <button
              onClick={() => onDifficultySelect('hard')}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex flex-col items-center min-w-[120px]"
            >
              <span className="font-bold">Hard</span>
              <span className="text-sm opacity-90">1600+</span>
            </button>
          </div>
        </div>
      )}
      
      {onNewPuzzle && (
        <button
          onClick={onNewPuzzle}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          New Random Puzzle
        </button>
      )}
    </div>
  );
}
