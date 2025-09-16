import { GameState, GameConfig, GuessResult } from '@/types/game';

export class GuessingGame {
  private state: GameState;

  constructor(config: GameConfig) {
    this.state = this.initializeGame(config);
  }

  private initializeGame(config: GameConfig): GameState {
    const targetNumber = Math.floor(
      Math.random() * (config.range.max - config.range.min + 1)
    ) + config.range.min;

    return {
      targetNumber,
      currentGuess: null,
      attempts: 0,
      maxAttempts: config.maxAttempts,
      gameStatus: 'playing',
      feedback: `Guess a number between ${config.range.min} and ${config.range.max}`,
      range: config.range,
    };
  }

  public makeGuess(guess: number): GameState {
    if (this.state.gameStatus !== 'playing') {
      return this.state;
    }

    this.state.currentGuess = guess;
    this.state.attempts++;

    const result = this.evaluateGuess(guess);
    this.updateGameState(result, guess);

    return { ...this.state };
  }

  private evaluateGuess(guess: number): GuessResult {
    if (guess === this.state.targetNumber) {
      return 'correct';
    } else if (guess > this.state.targetNumber) {
      return 'too_high';
    } else {
      return 'too_low';
    }
  }

  private updateGameState(result: GuessResult, guess: number): void {
    switch (result) {
      case 'correct':
        this.state.gameStatus = 'won';
        this.state.feedback = `Congratulations! You guessed the number ${this.state.targetNumber} in ${this.state.attempts} attempts!`;
        break;
      case 'too_high':
        this.state.feedback = `Too high! The number is less than ${guess}.`;
        break;
      case 'too_low':
        this.state.feedback = `Too low! The number is greater than ${guess}.`;
        break;
    }

    if (this.state.attempts >= this.state.maxAttempts && this.state.gameStatus === 'playing') {
      this.state.gameStatus = 'lost';
      this.state.feedback = `Game over! The correct number was ${this.state.targetNumber}.`;
    }
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public resetGame(config?: GameConfig): GameState {
    const gameConfig = config || {
      maxAttempts: this.state.maxAttempts,
      range: this.state.range,
    };
    this.state = this.initializeGame(gameConfig);
    return { ...this.state };
  }

  public getRemainingAttempts(): number {
    return Math.max(0, this.state.maxAttempts - this.state.attempts);
  }
}
