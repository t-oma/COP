import type { Game } from "~/entities/game";
import type { Position } from "~/shared/types";

export interface GamePlayState {
  currentGame: Game | null;
  foundWords: string[];
  selectedPositions: Position[];
  isSelecting: boolean;
  gameStatus: "idle" | "playing" | "completed";
  timeElapsed: number;
  score: number;
}
