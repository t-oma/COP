import { Game } from "@/types";
import Link from "next/link";

export default function GameCard({ game }: { game: Game }) {
  return (
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
  );
}
