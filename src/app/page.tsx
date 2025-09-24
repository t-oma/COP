import Link from "next/link";
import { games } from "./_lib/data";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default function HomePage() {
  return (
    <>
      <AppHeader />

      <main className="flex flex-1 flex-col">
        <div className="flex items-center px-10 py-4">
          <h1 className="text-xl font-semibold">Categories</h1>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-4 px-8">
          {games.map((game) => (
            <Link
              key={game.id}
              href={`#${game.link}`}
              className="relative flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-50 p-4 shadow-sm hover:bg-zinc-100"
            >
              <span className="text-xl">{game.title}</span>
              <span className="absolute top-0 right-0 p-4 text-base">
                {game.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </main>

      <AppFooter />
    </>
  );
}
