import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/games/:id", "./routes/game.tsx"),
] satisfies RouteConfig;
