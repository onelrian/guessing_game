'use client';

import { useState, useEffect } from 'react';
import { GuessingGame } from '@/lib/gameLogic';
import { GameState } from '@/types/game';

const GameBoard: React.FC = () => {
  const [game, setGame] = useState<GuessingGame | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const difficultySettings = {
    easy: { maxAttempts: 10, range: { min: 1, max: 50 } },
    medium: { maxAttempts: 7, range: { min: 1, max: 100 } },
    hard: { maxAttempts: 5, range: { min: 1, max: 200 } },
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeGame = () => {
    const newGame = new GuessingGame(difficultySettings[difficulty]);
    setGame(newGame);
    setGameState(newGame.getState());
    setInputValue('');
  };

  const handleGuess = () => {
    if (!game || !gameState) return;

    const guess = parseInt(inputValue);
    if (isNaN(guess)) {
      alert('Please enter a valid number');
      return;
    }

    if (guess < gameState.range.min || guess > gameState.range.max) {
      alert(`Please enter a number between ${gameState.range.min} and ${gameState.range.max}`);
      return;
    }

    const newState = game.makeGuess(guess);
    setGameState(newState);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const resetGame = () => {
    if (game) {
      const newState = game.resetGame();
      setGameState(newState);
      setInputValue('');
    }
  };

  if (!gameState) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Number Guessing Game
        </h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            disabled={gameState.gameStatus === 'playing' && gameState.attempts > 0}
          >
            <option value="easy">Easy (1-50, 10 attempts)</option>
            <option value="medium">Medium (1-100, 7 attempts)</option>
            <option value="hard">Hard (1-200, 5 attempts)</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-center mb-4">
          <p className="text-lg text-gray-700">{gameState.feedback}</p>
        </div>

        <div className="flex justify-between text-sm text-gray-800 font-medium mb-4">
          <span>Attempts: {gameState.attempts}/{gameState.maxAttempts}</span>
          <span>Range: {gameState.range.min}-{gameState.range.max}</span>
        </div>

        {gameState.gameStatus === 'playing' && (
          <div className="space-y-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess"
              min={gameState.range.min}
              max={gameState.range.max}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            />
            <button
              onClick={handleGuess}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Make Guess
            </button>
          </div>
        )}

        {gameState.gameStatus !== 'playing' && (
          <div className="text-center">
            <div className={`text-lg font-semibold mb-4 ${
              gameState.gameStatus === 'won' ? 'text-green-600' : 'text-red-600'
            }`}>
              {gameState.gameStatus === 'won' ? 'You Won!' : 'Game Over'}
            </div>
            <button
              onClick={resetGame}
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={initializeGame}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
