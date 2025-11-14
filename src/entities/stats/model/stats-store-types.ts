import type { Difficulty } from "~/shared/types";
import type { RecentGame, Stats } from "./types";

type StatsState = {
  global: Stats | null;
  recentGames: RecentGame[];
  playedDifficulties: Map<Difficulty, number>;
};

type StatsActions = {
  actions: {
    registerGame: (params: RegisterGameParams) => void;
  };
};

type StatsStore = StatsState & StatsActions;

type RegisterGameParams = {
  wordsFound: number;
  totalWords: number;
  timeTaken: number;
  difficulty: Difficulty;
};

export type { StatsState, StatsActions, StatsStore, RegisterGameParams };
