import type { Position } from "~/shared/types";

type GamePlayState = {
  foundWords: string[];
  playedPositions: Position[];
};

type GamePlayActions = {
  actions: {
    clearFoundWords: () => void;
    addFoundWord: (word: string) => void;
  };
};

type GamePlayStore = GamePlayState & GamePlayActions;

export type { GamePlayState, GamePlayActions, GamePlayStore };
