import GamePage from "~/pages/game/game";
import type { Route } from "./+types/game";

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function GameRoute() {
  return <GamePage />;
}
