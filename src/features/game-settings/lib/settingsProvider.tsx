import { createContext, use, useCallback, useMemo, useReducer } from "react";

import { initialState } from "./defaults";
import { reducer } from "./settingsReducer";
import type { GameSettings, GameSettingsUpdateParams } from "./types";

type GameSettingsContextValue = {
  settings: GameSettings;
  gameId: number | null;
  updateSettings: (gameId: number, patch: GameSettingsUpdateParams) => void;
  resetSettings: () => void;
};

const GameSettingsContext = createContext<GameSettingsContextValue | undefined>(
  undefined
);

type GameSettingsProviderProps = {
  children: React.ReactNode;
};

function GameSettingsProvider({
  children,
}: Readonly<GameSettingsProviderProps>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSettings = useCallback(
    (gameId: number, patch: GameSettingsUpdateParams) => {
      dispatch({ type: "update", gameId, patch });
    },
    []
  );

  const resetSettings = useCallback(() => dispatch({ type: "reset" }), []);

  const value = useMemo<GameSettingsContextValue>(
    () => ({
      settings: state.settings,
      gameId: state.gameId,
      updateSettings,
      resetSettings,
    }),
    [state.settings, state.gameId, updateSettings, resetSettings]
  );

  return <GameSettingsContext value={value}>{children}</GameSettingsContext>;
}

function useGameSettings(): GameSettingsContextValue {
  const context = use(GameSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useGameSettings must be used within a GameSettingsProvider"
    );
  }
  return context;
}

export { GameSettingsProvider, useGameSettings };
