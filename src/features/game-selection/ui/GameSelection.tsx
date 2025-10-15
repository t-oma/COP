import { games, GamesGrid } from "~/entities/game";

interface GameSelectionProps {
  selectedSize?: number | null;
}

export function GameSelection({ selectedSize }: GameSelectionProps) {
  const filteredGames = !selectedSize
    ? games
    : games.filter((game) => game.size === selectedSize);

  return <GamesGrid games={filteredGames} />;
}
