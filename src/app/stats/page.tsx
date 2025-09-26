import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import Category from "@/components/Stats/Category";
import CategoryItems from "@/components/Stats/CategoryItems";

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
              <CategoryItems stat={stats.games} />
            </Category>

            <Category title="Words">
              <CategoryItems stat={stats.words} />
            </Category>

            <Category title="Difficulties">
              <CategoryItems stat={stats.difficulties} />
            </Category>
          </div>
        </div>
      </main>

      <AppFooter />
    </>
  );
}
