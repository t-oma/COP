import { GameSelection } from "~/features/game-selection";
import { RootLayout } from "~/widgets";

export default function HomePage() {
  return (
    <RootLayout>
      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="w-full max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Word Search
            </h1>
            <p className="text-lg text-gray-600 md:text-xl">
              Challenge yourself with fun word search puzzles across different
              categories
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl">
              Choose a Category
            </h2>
          </div>

          <GameSelection />
        </div>
      </main>
    </RootLayout>
  );
}
