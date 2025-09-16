export interface GameState {
  targetNumber: number;
  currentGuess: number | null;
  attempts: number;
  maxAttempts: number;
  gameStatus: 'playing' | 'won' | 'lost';
  feedback: string;
  range: {
    min: number;
    max: number;
  };
}

export interface GameConfig {
  maxAttempts: number;
  range: {
    min: number;
    max: number;
  };
}

export type GuessResult = 'correct' | 'too_high' | 'too_low';
