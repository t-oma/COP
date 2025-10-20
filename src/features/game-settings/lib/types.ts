import type { Difficulty } from "~/shared/types";

export type GameSettings = {
  difficulty: Difficulty;
  gridSize: number;
  hintLength: number;
};

export type GameSettingsUpdateParams = Omit<GameSettings, "gridSize"> & {
  remember: boolean;
};
