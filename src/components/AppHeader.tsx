import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-300 bg-zinc-100 p-4 px-10">
      <Link
        href="/"
        className="text-xl"
      >
        Word Search
      </Link>

      <Link
        href="#/stats"
        className="text-xl"
      >
        Stats
      </Link>
    </header>
  );
}
