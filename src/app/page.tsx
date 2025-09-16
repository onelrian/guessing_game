import GameBoard from '@/components/GameBoard'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Number Guessing Game
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test your intuition and logic skills by guessing the secret number. 
          Choose your difficulty level and see how quickly you can find the answer!
        </p>
      </div>
      
      <GameBoard />
      
      <div className="mt-8 text-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Play</h2>
          <div className="text-left space-y-2 text-gray-600">
            <p><strong>Easy:</strong> Guess a number between 1-50 with 10 attempts</p>
            <p><strong>Medium:</strong> Guess a number between 1-100 with 7 attempts</p>
            <p><strong>Hard:</strong> Guess a number between 1-200 with 5 attempts</p>
          </div>
        </div>
      </div>
    </div>
  )
}
