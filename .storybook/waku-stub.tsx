import type { ComponentPropsWithoutRef } from "react";

// NOTE: Waku の Router は Storybook に存在しないため、
// `waku` / `waku/router/server` をこのスタブに差し替えている (main.ts の alias)

type RouterState = { path: string; query: string };

let routerState: RouterState = { path: "/", query: "" };

export const setRouterState = (state: Partial<RouterState> = {}) => {
  routerState = { path: "/", query: "", ...state };
};

export const useRouter = () => ({ ...routerState, hash: "" });

type LinkProps = { to: string } & Omit<ComponentPropsWithoutRef<"a">, "href">;

export const Link = ({ to, children, ...props }: LinkProps) => (
  <a href={to} {...props}>
    {children}
  </a>
);

export const unstable_notFound = (): never => {
  throw new Error("notFound() was called");
};
