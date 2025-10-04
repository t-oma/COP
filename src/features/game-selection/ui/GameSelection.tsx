import { GamesGrid, games } from "~/entities/game";

export function GameSelection() {
  return <GamesGrid games={games} />;
}