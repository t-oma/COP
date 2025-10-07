import { GlobalStats, RecentGames, recentGames, stats } from "~/entities/stats";
import { RootLayout } from "~/widgets";

export default function StatsPage() {
  return (
    <RootLayout>
      <main className="flex flex-1 flex-col px-10 pb-14">
        <div className="flex items-center py-4">
          <h1 className="text-xl font-semibold">Statistics</h1>
        </div>

        <GlobalStats stats={stats} />

        <RecentGames recentGames={recentGames} />
      </main>
    </RootLayout>
  );
}
