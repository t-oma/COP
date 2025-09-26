import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import Category from "@/components/Stats/Category";

const stats = {
  games: {
    played: 4,
    won: 3,
    lost: 1,
  },
  words: {
    guessed: 10,
  },
  difficulties: {
    easy: 3,
    medium: 2,
    hard: 1,
  },
};

export default function StatsPage() {
  return (
    <>
      <AppHeader />

      <main className="flex flex-1 flex-col">
        <div className="flex items-center border-b border-zinc-300 bg-zinc-100 px-8 py-4">
          <h1 className="text-xl font-semibold">Statistics</h1>
        </div>

        <div className="flex flex-1 justify-center p-16">
          <div className="flex flex-1 flex-col rounded-md border border-zinc-300 bg-zinc-100">
            <Category title="Games">
              <p>Played: {stats.games.played}</p>
              <p>Won: {stats.games.won}</p>
              <p>Lost: {stats.games.lost}</p>
            </Category>

            <Category title="Words">
              <p>Guessed: {stats.words.guessed}</p>
            </Category>

            <Category title="Difficulties">
              <p>Easy: {stats.difficulties.easy}</p>
              <p>Medium: {stats.difficulties.medium}</p>
              <p>Hard: {stats.difficulties.hard}</p>
            </Category>
          </div>
        </div>
      </main>

      <AppFooter />
    </>
  );
}
