// routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("product/:id", "routes/product.tsx"), // 👈 dynamic product route
  route("emailConfirmationWaiting", "routes/emailConfirmationWaiting.tsx"), // 👈 dynamic product route
  route("order", "routes/order.tsx"),
  route("policy", "routes/policy.tsx"),
] satisfies RouteConfig;