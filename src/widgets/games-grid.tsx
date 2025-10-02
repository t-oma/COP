import { GameCard } from "./game-card";
import type { Game } from "~/types";

function GamesGrid({ games }: Readonly<{ games: Game[] }>) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export { GamesGrid };
