import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { itemsAtPositions } from "~/shared/utils";
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

      reset: () =>
        set((state) => {
          state.foundWords = [];
          state.playedPositions = [];
          state.selectedPositions = [];
        }),

      setSelectedPositions: (positions: Position[]) =>
        set((state) => {
          state.selectedPositions = positions;
        }),

      resetSelectedPositions: () =>
        set((state) => {
          state.selectedPositions = [];
        }),

      submitWord: (
        words: string[],
        letters: string[][],
        positions: Position[]
      ) =>
        set((state) => {
          if (state.selectedPositions.length === 0) return;

          const selectedWord = itemsAtPositions(
            letters,
            state.selectedPositions
          )
            .reduce((acc, cur) => {
              return acc + cur.join("");
            }, "")
            .toLowerCase();

          if (
            words.includes(selectedWord) &&
            !state.foundWords.includes(selectedWord)
          ) {
            state.foundWords.push(selectedWord);
            state.playedPositions = [...state.playedPositions, ...positions];
          }
          state.selectedPositions = [];
        }),
    },
  }))
);

export { defaultInitState as gamePlayStoreDefaultInitState, useGamePlayStore };
