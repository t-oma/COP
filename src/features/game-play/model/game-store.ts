import { createStore } from "zustand/vanilla";
import type { GamePlayState, GamePlayStore } from "./game-store-types";

const defaultInitState: GamePlayState = {
  foundWords: [],
};

const createGamePlayStore = (initState: GamePlayState = defaultInitState) => {
  return createStore<GamePlayStore>()((set) => ({
    ...initState,
    actions: {
      clearFoundWords: () => set({ foundWords: [] }),
      addFoundWord: (word: string) =>
        set((state) => ({ foundWords: [...state.foundWords, word] })),
    },
  }));
};

export {
  defaultInitState as gamePlayStoreDefaultInitState,
  createGamePlayStore,
};
