import { games } from "~/entities/game";
import GamePage from "~/pages/game/game";
import type { Route } from "./+types/game";

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  return { game: games.find((g) => g.id === Number(params.id)) };
}

export default function GameRoute({ loaderData }: Route.ComponentProps) {
  return <GamePage game={loaderData.game} />;
}
