import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Difficulty } from "~/shared/types";
import type {
  RegisterGameParams,
  StatsState,
  StatsStore,
} from "./stats-store-types";

const getMostPlayedDifficulty = (
  playedDifficulties: Map<Difficulty, number>
) => {
  const mostPlayedDifficulty = Array.from(playedDifficulties.entries())
    .sort((a, b) => b[1] - a[1])
    .shift();

  console.log(mostPlayedDifficulty);

  return mostPlayedDifficulty?.[0] ?? "easy";
};

const defaultInitState: StatsState = {
  global: null,
  recentGames: [],
  playedDifficulties: new Map(),
};

const useStatsStore = create<StatsStore, [["zustand/immer", never]]>(
  immer((set) => ({
    ...defaultInitState,
    actions: {
      registerGame: (params: RegisterGameParams) =>
        set((state) => {
          if (!state.global) {
            state.global = {
              gamesPlayed: 0,
              wordsFound: 0,
              averageScore: 100,
              bestStreak: 0,
              totalTime: 0,
              favoriteDifficulty: "easy",
            };
          }

          state.global.gamesPlayed += 1;
          state.global.bestStreak += 1;
          state.global.wordsFound += params.wordsFound;

          const newScore = Math.round(
            (params.totalWords / params.wordsFound) * 100
          );
          state.global.averageScore = Math.round(
            (state.global.averageScore + newScore) / 2
          );

          state.playedDifficulties.set(
            params.difficulty,
            state.playedDifficulties.get(params.difficulty) ?? 0 + 1
          );
          state.global.favoriteDifficulty = getMostPlayedDifficulty(
            state.playedDifficulties
          );

          state.global.totalTime += params.timeTaken;
        }),
    },
  }))
);

export { useStatsStore, defaultInitState as statsStoreDefaultInitState };
