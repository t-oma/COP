import { games, GamesGrid } from '~/entities/game';

export function GameSelection() {
  return <GamesGrid games={games} />;
}
