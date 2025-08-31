interface ChessPiece {
  type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
  color: 'white' | 'black';
}

interface ChessBoardProps {
  fen: string;
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

export function ChessBoard({ fen }: ChessBoardProps) {
  const board = parseFEN(fen);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  
  return (
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
          {board.map((rank, rankIndex) => (
            <div key={rankIndex} className="flex">
              {rank.map((piece, fileIndex) => {
                const isLight = (rankIndex + fileIndex) % 2 === 0;
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
  );
}
