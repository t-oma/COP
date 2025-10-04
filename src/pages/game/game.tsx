import { games } from "~/entities/game";
import GameLettersGrid from "~/entities/game/ui/GameLettersGrid";
import { DifficultyNamedSizes } from "~/shared/data/data";
import { RootLayout } from "~/widgets";

const game = games[0];
const size = DifficultyNamedSizes[game.difficulty];

export default function GamePage() {
  return (
    <RootLayout>
      <main className="flex flex-1 flex-col">
        <div className="flex items-center border-b border-zinc-300 bg-zinc-100 px-8 py-4">
          <h1 className="text-xl font-semibold">{game.title}</h1>
        </div>

        <div className="flex flex-1">
          {/* <FoundWords game={game} /> */}

          <div className="flex flex-1 p-16">
            <GameLettersGrid size={size} />
          </div>
        </div>
      </main>{" "}
    </RootLayout>
  );
}
