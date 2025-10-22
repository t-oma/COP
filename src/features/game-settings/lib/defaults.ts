import { DifficultyNamedSizes } from "~/shared/data/data";
import type { State } from "./settingsReducer";
import type { GameSettings } from "./types";

export const defaultSettings: GameSettings = {
  difficulty: "easy",
  gridSize: DifficultyNamedSizes.easy,
  hintLength: 1,
};

export const initialState: State = { gameId: null, settings: defaultSettings };
