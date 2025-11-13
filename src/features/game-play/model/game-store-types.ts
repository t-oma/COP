import type { Position } from "~/shared/types";

type GamePlayState = {
  foundWords: string[];
  playedPositions: Position[];
  selectedPositions: Position[];
};

type GamePlayActions = {
  actions: {
    clearFoundWords: () => void;
    addFoundWord: (word: string) => void;
    updatePlayedPositions: (positions: Position[]) => void;
    setSelectedPositions: (positions: Position[]) => void;
    resetSelectedPositions: () => void;
    submitWord: (
      words: string[],
      letters: string[][],
      positions: Position[]
    ) => void;
  };
};

type GamePlayStore = GamePlayState & GamePlayActions;

export type { GamePlayState, GamePlayActions, GamePlayStore };
