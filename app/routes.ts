// routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("emailConfirmationWaiting", "routes/emailConfirmationWaiting.tsx"), // 👈 dynamic product route
  route("tracuu", "routes/lookup.tsx"),
  route("linkkien", "routes/linhkien.tsx"),
  route("nghiencuu", "routes/research.tsx"),
  route("sanpham", "routes/sanpham.tsx"),
] satisfies RouteConfig;