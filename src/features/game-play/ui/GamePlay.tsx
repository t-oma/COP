import { useCallback, useEffect, useMemo, useState } from "react";

import { FoundWords, games } from "~/entities/game";
import { useGameSettings } from "~/features/game-settings";
import { useGenerator } from "~/features/grid-generator";
import { ResultsModal } from "~/features/results-modal";
import { SelectableLettersGrid } from "~/features/word-selection";
import { useTimer } from "~/shared/hooks";
import { itemsAtPositions } from "~/shared/utils";
import { GameTimer, SidePanel } from "~/widgets";
import { useHint } from "../lib/useHint";
import { GameHelp } from "./GameHelp";
import { SelectControls } from "./SelectControls";
import type { Position } from "~/shared/types";

interface GamePlayProps {
  gameId: number;
}

export function GamePlay({ gameId }: Readonly<GamePlayProps>) {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [playedPositions, setPlayedPositions] = useState<Position[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);

  const { settings } = useGameSettings();

  const game = useMemo(
    () => games.find((g) => g.id === gameId) || games[0],
    [gameId]
  );
  const size = settings.gridSize;
  const difficulty = settings.difficulty;
  const category = game.wordsCategory;

  const timer = useTimer(0);

  const { words, letters } = useGenerator({ size, difficulty, category });
  const { highlightedPositions, hintsUsed, handleHint } = useHint({
    size,
    words,
    foundWords,
    letters,
    hintLength: settings.hintLength,
  });

  const isSelecting = selectedPositions.length > 0;
  const gameEnded = words.length > 0 && words.length === foundWords.length;

  useEffect(() => {
    if (gameEnded) {
      timer.pause();
    } else {
      timer.start();
    }
  }, [gameEnded, timer]);

  const handleSelectionChange = (positions: Position[]) => {
    setSelectedPositions(positions);
  };

  const handleSubmitWord = useCallback(() => {
    console.log("handleSubmitWord");
    if (selectedPositions.length === 0) return;

    const selectedWord = itemsAtPositions(letters, selectedPositions)
      .reduce((acc, cur) => {
        return acc + cur.join("");
      }, "")
      .toLowerCase();

    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords((prev) => [...prev, selectedWord]);
      setPlayedPositions((prev) => [...prev, ...selectedPositions]);
    }
    setSelectedPositions([]);
  }, [foundWords, selectedPositions, words, letters]);

  const handleResetSelection = useCallback(() => {
    console.log("handleResetSelection");
    setSelectedPositions([]);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmitWord();
      }
      if (e.key === "Escape") {
        handleResetSelection();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleSubmitWord, handleResetSelection]);

  return (
    <div className="flex flex-1">
      <ResultsModal
        open={gameEnded}
        timer={timer}
        foundWords={foundWords}
        totalWords={words}
      />

      <SidePanel>
        <FoundWords foundWords={foundWords} totalWords={words} />

        <GameTimer timer={timer} />

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
