import Link from "next/link";
import { levels } from "./_lib/data";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-center justify-between border-b border-zinc-300 p-4">
        <Link
          href="/"
          className="text-xl"
        >
          Word Search
        </Link>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="flex items-center px-10 py-4">
          <h1 className="text-xl font-semibold">Categories</h1>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-4 px-8">
          {levels.map((level) => (
            <Link
              key={level.id}
              href={`#${level.link}`}
              className="relative flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-50 p-4 shadow-sm hover:bg-zinc-100"
            >
              <span className="text-xl">{level.title}</span>
              <span className="absolute top-0 right-0 p-4 text-base">
                {level.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="flex items-center justify-center p-4">
        <p>Levchenko Artem</p>
      </footer>
    </>
  );
}
