import { recentGames, StatCard, stats } from "~/entities/stats";
import RecentGames from "~/entities/stats/ui/RecentGames";
import { RootLayout } from "~/widgets";

export default function StatsPage() {
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
    <RootLayout>
      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center py-4">
          <h1 className="text-xl font-semibold">Statistics</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <RecentGames recentGames={recentGames} />
      </main>
    </RootLayout>
  );
}
