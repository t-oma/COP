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
  if (playedDifficulties.size === 0) return "easy";

  const mostPlayedDifficulty = Array.from(playedDifficulties.entries())
    .sort((a, b) => b[1] - a[1])
    .shift();

  return mostPlayedDifficulty?.[0] ?? "easy";
};

const defaultInitState: StatsState = {
  global: null,
  recentGames: [],
  playedDifficulties: new Map(),
};

const useStatsStore = create<StatsStore>()(
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

          const currentFavorite = state.global.favoriteDifficulty;
          const newFavorite = getMostPlayedDifficulty(state.playedDifficulties);

          if (state.global.gamesPlayed === 1) {
            state.global.favoriteDifficulty = params.difficulty;
          } else {
            const currentCount =
              state.playedDifficulties.get(currentFavorite) ?? 0;
            const newCount = state.playedDifficulties.get(newFavorite) ?? 0;

            if (newCount > currentCount) {
              state.global.favoriteDifficulty = newFavorite;
            }
          }

          state.global.totalTime += params.timeTaken;
        }),
    },
  }))
);

export { useStatsStore, defaultInitState as statsStoreDefaultInitState };
