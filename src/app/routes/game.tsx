import { Navigate } from "react-router";

import { games } from "~/entities/game";
import { useSettingsGuard } from "~/features/game-settings";
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
  const { status } = useSettingsGuard({ gameId: loaderData.game?.id });

  if (status === "pending") return <></>;
  if (status === "redirect") return <Navigate to="/" />;

  return <GamePage game={loaderData.game} />;
}
