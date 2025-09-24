import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="flex flex-col items-center justify-between border-b border-zinc-300 p-4">
      <Link
        href="/"
        className="text-xl"
      >
        Word Search
      </Link>
    </header>
  );
}
