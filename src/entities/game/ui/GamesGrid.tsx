import { GameCard } from "./GameCard";
import type { Game } from "../model/types";

type GamesGridProps = {
  games: Game[];
};

export function GamesGrid({ games }: GamesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
