import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../init";
import { assetTypesRouter } from "./asset-types";
import { creditsRouter } from "./credits";
import { licensesRouter } from "./licenses";
import { recordsRouter } from "./records";
import { searchRouter } from "./search";
import { subscriptionsRouter } from "./subscriptions";

export const appRouter = createTRPCRouter({
  records: recordsRouter,
  licenses: licensesRouter,
  search: searchRouter,
  assetTypes: assetTypesRouter,
  credits: creditsRouter,
  subscriptions: subscriptionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
