import { useMemo } from "react";

import { SizeNamedDifficulties } from "~/shared/data/data";
import type { Game } from "~/entities/game";

interface UseGameProps {
  games: Game[];
  gameId?: number;
}

function useGame({ games, gameId }: Readonly<UseGameProps>) {
  const game = useMemo(
    () => games.find((g) => g.id === gameId) || games[0],
    [gameId, games]
  );

  const size = game.size;
  const difficulty = SizeNamedDifficulties[size];
  const category = game.wordsCategory;

  return {
    game,
    size,
    difficulty,
    category,
  };
}

export { useGame };
