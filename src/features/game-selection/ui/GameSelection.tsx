import { games, GamesGrid } from "~/entities/game";
import type { AvailableSizes } from "~/shared/types";

interface GameSelectionProps {
  selectedSize?: AvailableSizes | null;
}

export function GameSelection({ selectedSize }: GameSelectionProps) {
  const filteredGames = !selectedSize
    ? games
    : games.filter((game) => game.size === selectedSize);

  return <GamesGrid games={filteredGames} />;
}
