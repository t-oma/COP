import { useState } from "react";
import { FoundWords, games, LettersGrid } from "~/entities/game";
import { DifficultyNamedSizes } from "~/shared/data/data";
import { GameTimer, SidePanel } from "~/widgets";

interface GamePlayProps {
  gameId?: number;
}

export function GamePlay({ gameId }: Readonly<GamePlayProps>) {
  const game = games.find((g) => g.id === gameId) || games[0];
  const size = DifficultyNamedSizes[game.difficulty];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [foundWords, setFoundWords] = useState<string[]>([]);

  return (
    <div className="flex flex-1">
      <SidePanel>
        <FoundWords foundWords={foundWords} totalWords={game.words} />

        <GameTimer />
      </SidePanel>

      <div className="flex flex-1 p-16">
        <LettersGrid size={size} />
      </div>
    </div>
  );
}
