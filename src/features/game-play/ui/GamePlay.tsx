import { useState } from "react";

import { FoundWords, games } from "~/entities/game";
import { useGridLetters } from "~/features/grid-generator";
import { SelectableLettersGrid } from "~/features/word-selection";
import { DifficultyNamedSizes } from "~/shared/data/data";
import { itemsAtPositions } from "~/shared/utils/matrix";
import { GameTimer, SidePanel } from "~/widgets";
import { useHint } from "../lib/useHint";
import { GameHelp } from "./GameHelp";
import type { Position } from "~/shared/types";

interface GamePlayProps {
  gameId?: number;
}

export function GamePlay({ gameId }: Readonly<GamePlayProps>) {
  const game = games.find((g) => g.id === gameId) || games[0];
  const size = DifficultyNamedSizes[game.difficulty];

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [playedPositions, setPlayedPositions] = useState<Position[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const { letters } = useGridLetters({ words: game.words, size });
  const { highlightedPositions, hintsUsed, handleHint } = useHint({
    size,
    words: game.words,
    foundWords,
    letters,
  });

  const handleSelectionChange = (positions: Position[]) => {
    setSelectedPositions(positions);
    setIsSelecting(positions.length > 0);
  };

  const handleSubmitWord = () => {
    if (selectedPositions.length === 0) return;

    const selectedWord = itemsAtPositions(letters, selectedPositions)
      .reduce((acc, cur) => {
        return acc + cur.join("");
      }, "")
      .toLowerCase();
    console.log(selectedWord);
    if (
      game.words.includes(selectedWord) &&
      !foundWords.includes(selectedWord)
    ) {
      setFoundWords((prev) => [...prev, selectedWord]);
      setPlayedPositions((prev) => [...prev, ...selectedPositions]);
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

        <div className="">
          <button
            type="button"
            onClick={handleHint}
            disabled={hintsUsed >= 3}
            className="w-full rounded bg-purple-500 px-3 py-2 text-sm text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Hint ({3 - hintsUsed} left)
          </button>
        </div>

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

      <div className="relative flex flex-1 p-16">
        <GameHelp />
        <SelectableLettersGrid
          size={size}
          letters={letters}
          playedPositions={playedPositions}
          selectedPositions={selectedPositions}
          highlightedPositions={highlightedPositions}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
}
