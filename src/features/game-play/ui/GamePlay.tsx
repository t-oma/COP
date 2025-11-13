import { useCallback, useEffect } from "react";

import { FoundWords } from "~/entities/game";
import { useGameSettings } from "~/features/game-settings";
import { useGenerator } from "~/features/grid-generator";
import { ResultsModal } from "~/features/results-modal";
import { SelectableLettersGrid } from "~/features/word-selection";
import { useTimer } from "~/shared/hooks";
import { GameTimer, SidePanel } from "~/widgets";
import { useHint } from "../lib/useHint";
import { useGamePlayStore } from "../model/game-store";
import { GameHelp } from "./GameHelp";
import { GameHint } from "./GameHint";
import { GameScreen } from "./GameScreen";
import { SelectControls } from "./SelectControls";
import { TopPanel } from "./TopPanel";
import type { Game } from "~/entities/game";

type GamePlayProps = {
  game: Game;
};

export function GamePlay({ game }: Readonly<GamePlayProps>) {
  const foundWords = useGamePlayStore((state) => state.foundWords);
  const selectedPositions = useGamePlayStore(
    (state) => state.selectedPositions
  );
  const { resetSelectedPositions, submitWord } = useGamePlayStore(
    (state) => state.actions
  );

  const { settings } = useGameSettings();

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
    submitWord(words, letters, selectedPositions);
  }, [selectedPositions, words, letters, submitWord]);

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
      <ResultsModal open={gameEnded} timer={timer} totalWords={words} />

      <SidePanel>
        <FoundWords totalWords={words} />

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
