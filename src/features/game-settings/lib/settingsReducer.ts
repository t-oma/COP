import { DifficultyNamedSizes } from "~/shared/data/data";
import { defaultSettings } from "./defaults";
import type { GameSettings, GameSettingsUpdateParams } from "./types";

type State = {
  gameId: number | null;
  settings: GameSettings;
};

type Action =
  | { type: "update"; gameId: number; patch: GameSettingsUpdateParams }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "update": {
      const { difficulty, hintLength } = action.patch;
      const nextSettings: GameSettings = {
        difficulty,
        hintLength,
        gridSize: DifficultyNamedSizes[difficulty],
      };
      return { gameId: action.gameId, settings: nextSettings };
    }
    case "reset":
      return { gameId: null, settings: defaultSettings };
    default:
      return state;
  }
}

export { reducer };
export type { State, Action };
