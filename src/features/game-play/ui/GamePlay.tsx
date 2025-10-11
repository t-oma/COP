import { useState } from "react";

import { FoundWords, games } from "~/entities/game";
import { SelectableLettersGrid } from "~/features/word-selection";
import { DifficultyNamedSizes } from "~/shared/data/data";
import { GameTimer, SidePanel } from "~/widgets";
import type { Position } from "~/shared/types";

interface GamePlayProps {
  gameId?: number;
}

export function GamePlay({ gameId }: Readonly<GamePlayProps>) {
  const game = games.find((g) => g.id === gameId) || games[0];
  const size = DifficultyNamedSizes[game.difficulty];

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSelectionChange = (positions: Position[]) => {
    setSelectedPositions(positions);
    setIsSelecting(positions.length > 0);
  };

  const handleSubmitWord = () => {
    if (selectedPositions.length === 0) return;

    const mockWord = "test";
    if (game.words.includes(mockWord) && !foundWords.includes(mockWord)) {
      setFoundWords((prev) => [...prev, mockWord]);
    }
    setSelectedPositions([]);
    setIsSelecting(false);
  };

  const handleResetSelection = () => {
    setSelectedPositions([]);
    setIsSelecting(false);
  };

  return (
    <div className="flex flex-1">
      <SidePanel>
        <FoundWords foundWords={foundWords} totalWords={game.words} />

        <GameTimer autoStart />

        {/* Кнопки керування вибором */}
        {isSelecting && (
          <div className="mt-4 space-y-2">
            <div className="text-sm text-zinc-600">
              Selected: {selectedPositions.length} letters
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSubmitWord}
                className="flex-1 rounded bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-600"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleResetSelection}
                className="flex-1 rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </SidePanel>

      <div className="flex flex-1 p-16">
        <SelectableLettersGrid
          size={size}
          selectedPositions={selectedPositions}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
}
