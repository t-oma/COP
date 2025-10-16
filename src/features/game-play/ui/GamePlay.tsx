import { useEffect, useMemo, useState } from "react";

import { FoundWords, games } from "~/entities/game";
import { useGridLetters } from "~/features/grid-generator";
import { SelectableLettersGrid } from "~/features/word-selection";
import { SizeNamedDifficulties } from "~/shared/data/data";
import { itemsAtPositions } from "~/shared/utils";
import { GameTimer, SidePanel } from "~/widgets";
import { useGameWords } from "../lib/useGameWords";
import { useHint } from "../lib/useHint";
import { GameHelp } from "./GameHelp";
import { SelectControls } from "./SelectControls";
import type { Position } from "~/shared/types";

interface GamePlayProps {
  gameId?: number;
}

export function GamePlay({ gameId }: Readonly<GamePlayProps>) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [playedPositions, setPlayedPositions] = useState<Position[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const game = useMemo(
    () => games.find((g) => g.id === gameId) || games[0],
    [gameId]
  );
  const size = game.size;
  const difficulty = SizeNamedDifficulties[size];
  const category = game.wordsCategory;
  const { words } = useGameWords({ size, difficulty, category });

  const gameEnded = words.length > 0 && words.length === foundWords.length;

  const { letters } = useGridLetters({ words, size });
  const { highlightedPositions, hintsUsed, handleHint } = useHint({
    size,
    words,
    foundWords,
    letters,
    hintLength: 1,
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
    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
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

  useEffect(() => {
    if (gameEnded) {
      alert("Game ended");
    }
  }, [gameEnded]);

  return (
    <div className="flex flex-1">
      <SidePanel>
        <FoundWords foundWords={foundWords} totalWords={words} />

        <GameTimer autoStart />

        {isSelecting && (
          <SelectControls
            selectedLength={selectedPositions.length}
            handleSubmitWord={handleSubmitWord}
            handleResetSelection={handleResetSelection}
          />
        )}
      </SidePanel>

      <div className="relative flex flex-1 p-16">
        <div className="absolute top-0 right-0 left-0 flex items-center justify-between gap-4 p-2 px-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleHint}
              disabled={
                hintsUsed >= 3 || highlightedPositions.length > 0 || gameEnded
              }
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-white px-2 py-2 hover:shadow focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
            >
              <span className="text-xs">Hint ({3 - hintsUsed} left)</span>
            </button>
          </div>
          <GameHelp />
        </div>
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
