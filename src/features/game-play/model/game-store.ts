import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Position } from "~/shared/types";
import type { GamePlayState, GamePlayStore } from "./game-store-types";

const defaultInitState: GamePlayState = {
  foundWords: [],
  playedPositions: [],
  selectedPositions: [],
};

const useGamePlayStore = create<GamePlayStore, [["zustand/immer", never]]>(
  immer((set) => ({
    ...defaultInitState,
    actions: {
      clearFoundWords: () =>
        set((state) => {
          state.foundWords = [];
        }),
      addFoundWord: (word: string) =>
        set((state) => {
          state.foundWords.push(word);
        }),
      updatePlayedPositions: (positions: Position[]) =>
        set((state) => {
          state.playedPositions = [...state.playedPositions, ...positions];
        }),
      setSelectedPositions: (positions: Position[]) =>
        set((state) => {
          state.selectedPositions = positions;
        }),
      resetSelectedPositions: () =>
        set((state) => {
          state.selectedPositions = [];
        }),
    },
  }))
);

export { defaultInitState as gamePlayStoreDefaultInitState, useGamePlayStore };
