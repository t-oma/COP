import { games } from "@/app/_lib/data";
import GameCard from "./GameCard";

export default function GamesGrid() {
  return (
    <div className="grid flex-1 grid-cols-2 gap-4 px-8">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
        />
      ))}
    </div>
  );
}
