import StatsPage from "~/pages/stats/stats";
import type { Route } from "./+types/stats";

// eslint-disable-next-line
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function GameRoute() {
  return <StatsPage />;
}
