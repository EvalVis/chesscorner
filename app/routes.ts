import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/puzzles", "routes/puzzles.tsx"),
  route("/custom-rules", "routes/custom-rules.tsx"),
] satisfies RouteConfig;
