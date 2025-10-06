import type { RecentGame } from "../model/types";

interface RecentGamesProps {
  recentGames: RecentGame[];
}

export default function RecentGames({
  recentGames,
}: Readonly<RecentGamesProps>) {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-lg font-semibold text-zinc-900">Recent Games</h2>
      <div className="space-y-4">
        {recentGames.map((game, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">🎯</div>
              <div>
                <p className="text-foreground font-medium">{game.title}</p>
                <p className="text-muted-foreground text-sm">{game.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-foreground font-semibold">{game.score}</p>
              <p className="text-muted-foreground text-sm">{game.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
