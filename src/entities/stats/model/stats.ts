import type { RecentGame, Stats } from "./types";

export const stats: Stats = {
  gamesPlayed: 42,
  wordsFound: 387,
  averageScore: 85,
  bestStreak: 12,
  totalTime: "24h 15m",
  favoriteDifficulty: "Medium",
};

export const recentGames: RecentGame[] = [
  { title: "Weather", score: "95%", time: "3m 24s", date: "Today" },
  {
    title: "Animals",
    score: "87%",
    time: "4m 12s",
    date: "Yesterday",
  },
  {
    title: "Colors",
    score: "92%",
    time: "2m 45s",
    date: "2 days ago",
  },
];
