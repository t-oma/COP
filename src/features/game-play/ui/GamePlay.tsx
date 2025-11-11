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
import { useGamePlayStore } from "../model/game-store";
import { GameHelp } from "./GameHelp";
import { GameHint } from "./GameHint";
import { GameScreen } from "./GameScreen";
import { SelectControls } from "./SelectControls";
import { TopPanel } from "./TopPanel";
import type { Position } from "~/shared/types";

type GamePlayProps = {
  gameId: number;
};

export function GamePlay({ gameId }: Readonly<GamePlayProps>) {
  const [playedPositions, setPlayedPositions] = useState<Position[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);

  const {
    actions: { addFoundWord },
    foundWords,
  } = useGamePlayStore((state) => state);

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

  const handleSelectionChange = useCallback((positions: Position[]) => {
    setSelectedPositions(positions);
  }, []);

  const handleSubmitWord = useCallback(() => {
    if (selectedPositions.length === 0) return;

    const selectedWord = itemsAtPositions(letters, selectedPositions)
      .reduce((acc, cur) => {
        return acc + cur.join("");
      }, "")
      .toLowerCase();

    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      addFoundWord(selectedWord);
      setPlayedPositions((prev) => [...prev, ...selectedPositions]);
    }
    setSelectedPositions([]);
  }, [foundWords, addFoundWord, selectedPositions, words, letters]);

  const handleResetSelection = useCallback(() => {
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

      <GameScreen>
        <TopPanel>
          <GameHint
            handleHint={handleHint}
            hintsUsed={hintsUsed}
            disabled={gameEnded || highlightedPositions.length > 0}
          />
          <GameHelp />
        </TopPanel>
        <SelectableLettersGrid
          size={size}
          letters={letters}
          playedPositions={playedPositions}
          selectedPositions={selectedPositions}
          highlightedPositions={highlightedPositions}
          onSelectionChange={handleSelectionChange}
        />
      </GameScreen>
    </div>
  );
}
