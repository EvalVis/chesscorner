import { useLanguage } from '../contexts/LanguageContext';

interface ChessPiece {
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
  color: 'white' | 'black';
}

interface ChessBoardProps {
  fen: string;
  flipped?: boolean;
  onFlip?: () => void;
}

function parseFEN(fen: string): (ChessPiece | null)[][] {
  const parts = fen.split(' ');
  const boardStr = parts[0];
  const ranks = boardStr.split('/');
  
  const board: (ChessPiece | null)[][] = [];
  
  for (const rank of ranks) {
    const row: (ChessPiece | null)[] = [];
    
    for (const char of rank) {
      if (char >= '1' && char <= '8') {
        const emptySquares = parseInt(char);
        for (let i = 0; i < emptySquares; i++) {
          row.push(null);
        }
      } else {
        const isUpperCase = char === char.toUpperCase();
        const color = isUpperCase ? 'white' : 'black';
        const type = char.toLowerCase() as ChessPiece['type'];
        row.push({ type, color });
      }
    }
    board.push(row);
  }
  
  return board;
}

function getPieceImage(piece: ChessPiece): string {
  const pieceNames = {
    p: 'pawn',
    r: 'rook', 
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king'
  };
  
  return `/pieces/${piece.color}/${pieceNames[piece.type]}.png`;
}

export function ChessBoard({ fen, flipped = false, onFlip }: ChessBoardProps) {
  const { t } = useLanguage();
  const board = parseFEN(fen);
  const files = flipped ? ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = flipped ? ['1', '2', '3', '4', '5', '6', '7', '8'] : ['8', '7', '6', '5', '4', '3', '2', '1'];
  const displayBoard = flipped ? board.slice().reverse().map(rank => rank.slice().reverse()) : board;
  
  return (
    <div className="flex flex-col items-center space-y-3">
      {onFlip && (
        <button
          onClick={onFlip}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{t('flipBoard')}</span>
        </button>
      )}
      
      <div className="inline-block">
        <div className="flex">
          <div className="w-6"></div>
          {files.map((file) => (
            <div key={file} className="w-12 h-6 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">{file}</span>
            </div>
          ))}
          <div className="w-6"></div>
        </div>
        
        <div className="flex">
          <div className="flex flex-col">
            {ranks.map((rank) => (
              <div key={rank} className="w-6 h-12 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{rank}</span>
              </div>
            ))}
          </div>
          
          <div className="border-2 border-gray-800">
            {displayBoard.map((rank, rankIndex) => (
              <div key={rankIndex} className="flex">
                {rank.map((piece, fileIndex) => {
                  const actualRankIndex = flipped ? 7 - rankIndex : rankIndex;
                  const actualFileIndex = flipped ? 7 - fileIndex : fileIndex;
                  const isLight = (actualRankIndex + actualFileIndex) % 2 === 0;
                  const squareColor = isLight ? 'bg-amber-100' : 'bg-amber-800';
                  
                  return (
                    <div
                      key={fileIndex}
                      className={`w-12 h-12 flex items-center justify-center ${squareColor}`}
                    >
                      {piece && (
                        <img
                          src={getPieceImage(piece)}
                          alt={`${piece.color} ${piece.type}`}
                          className="w-10 h-10"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col">
            {ranks.map((rank) => (
              <div key={rank} className="w-6 h-12 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{rank}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex">
          <div className="w-6"></div>
          {files.map((file) => (
            <div key={file} className="w-12 h-6 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-700">{file}</span>
            </div>
          ))}
          <div className="w-6"></div>
        </div>
      </div>
    </div>
  );
}
