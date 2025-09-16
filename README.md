# Number Guessing Game

A professional, interactive number guessing game built with Next.js, TypeScript, and Tailwind CSS. This modern web application transforms the classic guessing game into a sleek, responsive experience with multiple difficulty levels.

## Features

- **Multiple Difficulty Levels**: Easy (1-50), Medium (1-100), and Hard (1-200)
- **Smart Feedback System**: Provides helpful hints after each guess
- **Attempt Tracking**: Shows remaining attempts and progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Minimal, professional interface with smooth interactions
- **TypeScript**: Fully typed for better development experience
- **Modern Stack**: Built with Next.js 14 and React 18

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/onelrian/guessing_game.git
cd guessing_game
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## How to Play

1. **Choose Difficulty**: Select from Easy, Medium, or Hard difficulty levels
2. **Make Your Guess**: Enter a number within the specified range
3. **Get Feedback**: The game will tell you if your guess is too high or too low
4. **Win or Lose**: Guess correctly within the attempt limit to win!

### Difficulty Levels

| Level  | Range  | Attempts |
|--------|--------|----------|
| Easy   | 1-50   | 10       |
| Medium | 1-100  | 7        |
| Hard   | 1-200  | 5        |

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # React components
│   └── GameBoard.tsx   # Main game component
├── lib/               # Utility libraries
│   └── gameLogic.ts   # Game logic and state management
└── types/             # TypeScript type definitions
    └── game.ts        # Game-related types
```

## Architecture

The application follows modern React patterns and best practices:

- **Component-Based Architecture**: Modular, reusable components
- **Type Safety**: Full TypeScript implementation with strict typing
- **State Management**: Clean state management using React hooks
- **Separation of Concerns**: Business logic separated from UI components
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## API Reference

### GuessingGame Class

The core game logic is encapsulated in the `GuessingGame` class:

#### Constructor
```typescript
new GuessingGame(config: GameConfig)
```

#### Methods
- `makeGuess(guess: number): GameState` - Submit a guess and get updated game state
- `getState(): GameState` - Get current game state
- `resetGame(config?: GameConfig): GameState` - Reset the game with optional new config
- `getRemainingAttempts(): number` - Get number of remaining attempts

### Types

#### GameState
```typescript
interface GameState {
  targetNumber: number;
  currentGuess: number | null;
  attempts: number;
  maxAttempts: number;
  gameStatus: 'playing' | 'won' | 'lost';
  feedback: string;
  range: { min: number; max: number };
}
```

#### GameConfig
```typescript
interface GameConfig {
  maxAttempts: number;
  range: { min: number; max: number };
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

The project uses:
- ESLint for code linting
- TypeScript for type safety
- Prettier-compatible formatting
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Legacy

This project evolved from a simple bash script (`guess_number.sh`) into a modern web application, maintaining the core game mechanics while adding a professional user interface and enhanced features.