import { games, GamesGrid } from "~/entities/game";
import type { Difficulty } from "~/shared/types";

interface GameSelectionProps {
  selectedDifficulty?: Difficulty | "all";
}

export function GameSelection({ selectedDifficulty }: GameSelectionProps) {
  const filteredGames =
    !selectedDifficulty || selectedDifficulty === "all"
      ? games
      : games.filter((game) => game.difficulty === selectedDifficulty);

  return <GamesGrid games={filteredGames} />;
}
