import { Link } from "react-router";
import type { Game } from "../model/types";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      key={game.id}
      to={`games/${game.id}`}
      className="relative flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-50 p-4 shadow-sm hover:bg-zinc-100"
    >
      <span className="text-xl">{game.title}</span>
      <span className="absolute top-0 right-0 p-4 text-base">
        {game.difficulty}
      </span>
    </Link>
  );
}
