import { GlobalStats, RecentGames, useStatsStore } from "~/entities/stats";
import { RootLayout } from "~/widgets";

export default function StatsPage() {
  const stats = useStatsStore((state) => state.context.global);
  const recentGames = useStatsStore((state) => state.context.recentGames);

  return (
    <RootLayout>
      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center py-4">
          <h1 className="text-xl font-semibold">Statistics</h1>
        </div>

        {!stats ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10">
            <p className="text-xl font-semibold">No games played yet</p>
            <p>Start playing some games to see your stats</p>
          </div>
        ) : (
          <GlobalStats stats={stats} />
        )}

        <RecentGames recentGames={recentGames} />
      </main>
    </RootLayout>
  );
}
