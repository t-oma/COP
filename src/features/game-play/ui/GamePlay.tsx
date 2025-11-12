import { useCallback, useEffect, useMemo } from "react";

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

type GamePlayProps = {
  gameId: number;
};

export function GamePlay({ gameId }: Readonly<GamePlayProps>) {
  const foundWords = useGamePlayStore((state) => state.foundWords);
  const selectedPositions = useGamePlayStore(
    (state) => state.selectedPositions
  );
  const {
    addFoundWord,
    updatePlayedPositions,
    setSelectedPositions,
    resetSelectedPositions,
  } = useGamePlayStore((state) => state.actions);

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

  const handleSubmitWord = useCallback(() => {
    if (selectedPositions.length === 0) return;

    const selectedWord = itemsAtPositions(letters, selectedPositions)
      .reduce((acc, cur) => {
        return acc + cur.join("");
      }, "")
      .toLowerCase();

    if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      addFoundWord(selectedWord);
      updatePlayedPositions(selectedPositions);
    }
    setSelectedPositions([]);
  }, [
    foundWords,
    setSelectedPositions,
    addFoundWord,
    updatePlayedPositions,
    selectedPositions,
    words,
    letters,
  ]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmitWord();
      }
      if (e.key === "Escape") {
        resetSelectedPositions();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleSubmitWord, resetSelectedPositions]);

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

        {isSelecting && <SelectControls handleSubmitWord={handleSubmitWord} />}
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
          highlightedPositions={highlightedPositions}
        />
      </GameScreen>
    </div>
  );
}
