import { DifficultyNamedSizes, games } from "@/app/_lib/data";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import GameLettersGrid from "@/components/GameLettersGrid";

const gameId = 1;
const game = games.find((game) => game.id === gameId);
const size = DifficultyNamedSizes[game!.difficulty];

export default function GamePage() {
  return (
    <>
      <AppHeader />

      <main className="flex flex-1 flex-col">
        <div className="flex items-center border-b border-zinc-300 bg-zinc-100 px-8 py-4">
          <h1 className="text-xl font-semibold">{game?.title}</h1>
        </div>

        <div className="flex flex-1">
          <section className="flex w-40 flex-col items-center border-r border-zinc-300 bg-zinc-100 p-4">
            <h2>Found words:</h2>
          </section>

          <div className="flex flex-1 p-16">
            <GameLettersGrid size={size} />
          </div>
        </div>
      </main>

      <AppFooter />
    </>
  );
}
