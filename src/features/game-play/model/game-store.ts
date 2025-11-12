import { create } from "zustand";
import type { Position } from "~/shared/types";
import type { GamePlayState, GamePlayStore } from "./game-store-types";

const defaultInitState: GamePlayState = {
  foundWords: [],
  playedPositions: [],
  selectedPositions: [],
};

const useGamePlayStore = create<GamePlayStore>((set) => ({
  ...defaultInitState,
  actions: {
    clearFoundWords: () => set({ foundWords: [] }),
    addFoundWord: (word: string) =>
      set((state) => ({ foundWords: [...state.foundWords, word] })),
    updatePlayedPositions: (positions: Position[]) =>
      set((state) => ({
        playedPositions: [...state.playedPositions, ...positions],
      })),
    setSelectedPositions: (positions: Position[]) =>
      set(() => ({ selectedPositions: positions })),
    resetSelectedPositions: () => set(() => ({ selectedPositions: [] })),
  },
}));

export { defaultInitState as gamePlayStoreDefaultInitState, useGamePlayStore };
