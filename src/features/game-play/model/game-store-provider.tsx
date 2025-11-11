import { createContext, use, useRef } from "react";

import { useStore } from "zustand";
import { createGamePlayStore } from "./game-store";
import type {
  GamePlayStore,
  GamePlayStoreApi,
  GamePlayStoreProviderProps,
} from "./game-store-types";

const GamePlayStoreContext = createContext<GamePlayStoreApi | undefined>(
  undefined
);

const GamePlayStoreProvider = ({ children }: GamePlayStoreProviderProps) => {
  const storeRef = useRef<GamePlayStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createGamePlayStore();
  }

  return (
    <GamePlayStoreContext value={storeRef.current}>
      {children}
    </GamePlayStoreContext>
  );
};

const useGamePlayStore = <T,>(selector: (store: GamePlayStore) => T): T => {
  const gameStoreContext = use(GamePlayStoreContext);

  if (!gameStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(gameStoreContext, selector);
};

export { GamePlayStoreContext, GamePlayStoreProvider, useGamePlayStore };
