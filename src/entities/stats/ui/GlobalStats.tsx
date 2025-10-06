import type { Stats } from "../model/types";
import { StatCard } from "./StatCard";

interface GlobalStatsProps {
  stats: Stats;
}

export default function GlobalStats({ stats }: Readonly<GlobalStatsProps>) {
  const cards = [
    {
      title: "Games Played",
      value: stats.gamesPlayed,
      description: "Total games completed",
      icon: "🎮",
    },
    {
      title: "Words Found",
      value: stats.wordsFound,
      description: "Total words discovered",
      icon: "🔍",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}%`,
      description: "Your average performance",
      icon: "📊",
    },
    {
      title: "Best Streak",
      value: stats.bestStreak,
      description: "Longest word finding streak",
      icon: "🔥",
    },
    {
      title: "Time Played",
      value: stats.totalTime,
      description: "Total time spent playing",
      icon: "⏱️",
    },
    {
      title: "Favorite Level",
      value: stats.favoriteDifficulty,
      description: "Most played difficulty",
      icon: "⭐",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
