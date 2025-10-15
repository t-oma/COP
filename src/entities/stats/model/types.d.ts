import type { Difficulty } from "~/shared/types";

export type Stats = {
  gamesPlayed: number;
  wordsFound: number;
  averageScore: number;
  bestStreak: number;
  totalTime: string;
  favoriteDifficulty: Difficulty;
};

export type RecentGame = {
  title: string;
  score: string;
  time: string;
  date: string;
};
