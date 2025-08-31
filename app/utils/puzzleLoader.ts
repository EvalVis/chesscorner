export interface PuzzleData {
  puzzleId: string;
  fen: string;
  rating: number;
}

export async function getRandomPuzzle(): Promise<PuzzleData> {
  const randomPart = Math.floor(Math.random() * 20) + 1;
  const fileName = `lichess_db_puzzle_part${randomPart.toString().padStart(2, '0')}.csv`;
  
  try {
    const response = await fetch(`/puzzles/${fileName}`);
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    const dataLines = lines.slice(1).filter(line => line.trim() !== '');
    const randomLineIndex = Math.floor(Math.random() * dataLines.length);
    const randomLine = dataLines[randomLineIndex];
    
    const columns = randomLine.split(',');
    
    return {
      puzzleId: columns[0],
      fen: columns[1],
      rating: parseInt(columns[3])
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
