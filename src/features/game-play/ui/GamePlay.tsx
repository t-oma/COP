import { useCallback, useEffect, useRef } from "react";

import { FoundWords } from "~/entities/game";
import { useStatsStore } from "~/entities/stats";
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
  const gameRegistered = useRef(false);

  const foundWords = useGamePlayStore((state) => state.foundWords);
  const selectedPositions = useGamePlayStore(
    (state) => state.selectedPositions
  );
  const { resetSelectedPositions, submitWord, reset } = useGamePlayStore(
    (state) => state.actions
  );
  const { registerGame } = useStatsStore((state) => state.actions);

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

  const handleSubmitWord = useCallback(() => {
    submitWord(words, letters, selectedPositions);
  }, [selectedPositions, words, letters, submitWord]);

  const handleGameOver = useCallback(() => {
    registerGame({
      wordsFound: foundWords.length,
      totalWords: words.length,
      timeTaken: timer.time,
      difficulty: difficulty,
      title: game.title,
      date: new Date().toLocaleString(),
    });
    gameRegistered.current = true;
  }, [registerGame, foundWords, timer, difficulty, words, game.title]);

  useEffect(() => {
    if (gameEnded) {
      timer.pause();

      if (gameRegistered.current) return;
      handleGameOver();
    } else {
      timer.start();
    }
  }, [gameEnded, timer, handleGameOver]);

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

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

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
