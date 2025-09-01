import { useState } from 'react';
import { ChessBoard } from './ChessBoard';
import { useLanguage } from '../contexts/LanguageContext';
import { type DifficultyLevel, DIFFICULTY_RANGES } from '../utils/puzzleLoader';

interface ChessPuzzleProps {
  puzzleId: string;
  fen: string;
  rating: number;
  onNewPuzzle?: () => void;
  onDifficultySelect?: (difficulty: DifficultyLevel) => void;
}

function getActivePlayer(fen: string): 'white' | 'black' {
  const parts = fen.split(' ');
  return parts[1] === 'w' ? 'white' : 'black';
}

function getDifficultyLabel(rating: number, t: (key: string) => string): string {
  if (rating < 600) return t('easy');
  if (rating < 1600) return t('medium');
  return t('hard');
}

function getDifficultyColor(rating: number): string {
  if (rating < 600) return 'text-green-600';
  if (rating < 1600) return 'text-yellow-600';
  return 'text-red-600';
}

export function ChessPuzzle({ puzzleId, fen, rating, onNewPuzzle, onDifficultySelect }: ChessPuzzleProps) {
  const { t } = useLanguage();
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);
  const activePlayer = getActivePlayer(fen);
  const difficultyLabel = getDifficultyLabel(rating, t);
  const difficultyColor = getDifficultyColor(rating);
  
  const handleFlipBoard = () => {
    setIsBoardFlipped(!isBoardFlipped);
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-2xl">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('chessPuzzle')}</h2>
        <div className="flex flex-col space-y-1 text-sm text-gray-600">
          <div>
            <span className="font-semibold">{t('puzzleId')}:</span> {puzzleId}
          </div>
          <div>
            <span className="font-semibold">{t('rating')}:</span> {rating} 
            <span className={`ml-2 font-bold ${difficultyColor}`}>({difficultyLabel})</span>
          </div>
          <div>
            <span className="font-semibold">{t('toMove')}:</span> 
            <span className={`ml-1 font-bold ${activePlayer === 'white' ? 'text-gray-700' : 'text-gray-900'}`}>
              {t(activePlayer)}
            </span>
          </div>
        </div>
      </div>
      
      <ChessBoard fen={fen} flipped={isBoardFlipped} onFlip={handleFlipBoard} />
      
      {onDifficultySelect && (
        <div className="flex flex-col items-center space-y-4 w-full">
          <h3 className="text-lg font-semibold text-gray-800">{t('chooseDifficulty')}</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => onDifficultySelect('easy')}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex flex-col items-center min-w-[120px]"
            >
              <span className="font-bold">{t('easy')}</span>
              <span className="text-sm opacity-90">{DIFFICULTY_RANGES.easy.min}-{DIFFICULTY_RANGES.easy.max}</span>
            </button>
            <button
              onClick={() => onDifficultySelect('medium')}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex flex-col items-center min-w-[120px]"
            >
              <span className="font-bold">{t('medium')}</span>
              <span className="text-sm opacity-90">{DIFFICULTY_RANGES.medium.min}-{DIFFICULTY_RANGES.medium.max}</span>
            </button>
            <button
              onClick={() => onDifficultySelect('hard')}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex flex-col items-center min-w-[120px]"
            >
              <span className="font-bold">{t('hard')}</span>
              <span className="text-sm opacity-90">{DIFFICULTY_RANGES.hard.min}+</span>
            </button>
          </div>
        </div>
      )}
      
      {onNewPuzzle && (
        <button
          onClick={onNewPuzzle}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          {t('newRandomPuzzle')}
        </button>
      )}
    </div>
  );
}
