import { FoundWords, GameLettersGrid, games } from "~/entities/game";
import { DifficultyNamedSizes } from "~/shared/data/data";
import { RootLayout } from "~/widgets";

const game = games[0];
const size = DifficultyNamedSizes[game.difficulty];

export default function GamePage() {
  // TODO: This should come from game state management
  const foundWords: string[] = [];

  return (
    <RootLayout>
      <main className="flex flex-1 flex-col">
        <div className="bg-accent-background flex items-center border-b border-zinc-300 px-8 py-4">
          <h1 className="text-xl font-semibold">{game.title}</h1>
        </div>

        <div className="flex flex-1">
          <FoundWords foundWords={foundWords} totalWords={game.words} />

          <div className="flex flex-1 p-16">
            <GameLettersGrid size={size} />
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
