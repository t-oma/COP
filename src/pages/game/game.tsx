import { games } from "~/entities/game";
import { GamePlay } from "~/features/game-play";
import { RootLayout } from "~/widgets";

const game = games[1];

export default function GamePage() {
  return (
    <RootLayout>
      <main className="flex flex-1 flex-col">
        <div className="bg-accent-background flex items-center border-b border-zinc-300 px-8 py-4">
          <h1 className="text-xl font-semibold">{game.title}</h1>
        </div>

        <GamePlay gameId={game.id} />
      </main>
    </RootLayout>
  );
}
