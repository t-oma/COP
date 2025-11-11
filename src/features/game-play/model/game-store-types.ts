import type { ReactNode } from "react";
import type { createGamePlayStore } from "./game-store";

// --- Store ---

type GamePlayState = {
  foundWords: string[];
};

type GamePlayActions = {
  actions: {
    clearFoundWords: () => void;
    addFoundWord: (word: string) => void;
  };
};

type GamePlayStore = GamePlayState & GamePlayActions;

// --- Provider ---

type GamePlayStoreApi = ReturnType<typeof createGamePlayStore>;

type GamePlayStoreProviderProps = {
  children: ReactNode;
};

export type { GamePlayState, GamePlayActions, GamePlayStore };
export type { GamePlayStoreApi, GamePlayStoreProviderProps };
