import type { Game } from "../model/types";
import { GameCard } from "./GameCard";

interface GamesGridProps {
  games: Game[];
}

export function GamesGrid({ games }: GamesGridProps) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
