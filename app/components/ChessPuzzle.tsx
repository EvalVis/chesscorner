import { ChessBoard } from './ChessBoard';

interface ChessPuzzleProps {
  puzzleId: string;
  fen: string;
  rating: number;
  onNewPuzzle?: () => void;
}

function getActivePlayer(fen: string): 'White' | 'Black' {
  const parts = fen.split(' ');
  return parts[1] === 'w' ? 'White' : 'Black';
}

export function ChessPuzzle({ puzzleId, fen, rating, onNewPuzzle }: ChessPuzzleProps) {
  const activePlayer = getActivePlayer(fen);
  
  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Chess Puzzle</h2>
        <div className="flex flex-col space-y-1 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Puzzle ID:</span> {puzzleId}
          </div>
          <div>
            <span className="font-semibold">Rating:</span> {rating}
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
