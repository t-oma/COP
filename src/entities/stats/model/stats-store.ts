import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  persist(
    immer((set) => ({
      context: {
        ...defaultInitState,
      },
      actions: {
        registerGame: (params: RegisterGameParams) =>
          set((state) => {
            if (!state.context.global) {
              state.context.global = {
                gamesPlayed: 0,
                wordsFound: 0,
                averageScore: 100,
                bestStreak: 0,
                totalTime: 0,
                favoriteDifficulty: "easy",
              };
            }

            state.context.global.gamesPlayed += 1;
            state.context.global.bestStreak += 1;
            state.context.global.wordsFound += params.wordsFound;

            const newScore = Math.round(
              (params.totalWords / params.wordsFound) * 100
            );

            state.context.global.averageScore = Math.round(
              (state.context.global.averageScore + newScore) / 2
            );

            const nextPlayedDifficulties = new Map(
              state.context.playedDifficulties
            );
            nextPlayedDifficulties.set(
              params.difficulty,
              (nextPlayedDifficulties.get(params.difficulty) ?? 0) + 1
            );
            state.context.playedDifficulties = nextPlayedDifficulties;

            const newFavorite = getMostPlayedDifficulty(
              state.context.playedDifficulties
            );

            if (
              state.context.global.gamesPlayed === 1 ||
              (state.context.playedDifficulties.get(newFavorite) ?? 0) >
                (state.context.playedDifficulties.get(
                  state.context.global.favoriteDifficulty
                ) ?? 0)
            ) {
              state.context.global.favoriteDifficulty = newFavorite;
            }

            state.context.global.totalTime += params.timeTaken;

            state.context.recentGames.push({
              title: params.title,
              score: newScore.toString(),
              time: params.timeTaken.toString(),
              date: params.date,
              difficulty: params.difficulty,
            });
          }),
      },
    })),
    {
      name: "stats-storage",
      partialize: (state) => ({ context: state.context }),
    }
  )
);

export { useStatsStore, defaultInitState as statsStoreDefaultInitState };
