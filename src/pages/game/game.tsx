import { GamePlay } from "~/features/game-play";
import { RootLayout } from "~/widgets";
import type { Game } from "~/entities/game";

interface GamePageProps {
  game?: Game;
}

export default function GamePage({ game }: Readonly<GamePageProps>) {
  if (!game) {
    return (
      <RootLayout>
        <main className="flex flex-1 flex-col">
          <h1>Game not found</h1>
        </main>
      </RootLayout>
    );
  }

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
