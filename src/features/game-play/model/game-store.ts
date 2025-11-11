import { create } from "zustand";
import type { GamePlayState, GamePlayStore } from "./game-store-types";

const defaultInitState: GamePlayState = {
  foundWords: [],
  playedPositions: [],
};

const useGamePlayStore = create<GamePlayStore>((set) => ({
  ...defaultInitState,
  actions: {
    clearFoundWords: () => set({ foundWords: [] }),
    addFoundWord: (word: string) =>
      set((state) => ({ foundWords: [...state.foundWords, word] })),
  },
}));

export { defaultInitState as gamePlayStoreDefaultInitState, useGamePlayStore };
