import { Link } from "react-router";

import { SizeNamedDifficulties as SND } from "~/shared/data/data";
import { capitalize } from "~/shared/utils";
import type { Game } from "../model/types";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link
      key={game.id}
      to={`#${game.link}`}
      className="relative flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-50 p-4 shadow-sm hover:bg-zinc-100"
    >
      <span className="text-xl">{game.title}</span>
      <span className="absolute top-0 right-0 p-4 text-base">
        {capitalize(SND[game.size])} ({game.size}x{game.size})
      </span>
    </Link>
  );
}
