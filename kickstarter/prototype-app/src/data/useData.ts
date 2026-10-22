import { seedPortfolio } from "./seed";
import type { DataState } from "../app/config";
import type { Portfolio } from "./types";

export type DataResult =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; portfolio: Portfolio };

/**
 * Hook → adapter → component. Today it reads the seed; a real adapter drops in
 * here later with the same return shape. The `state` flag forces empty, loading,
 * or error so every state is one link away.
 */
export function useData(state: DataState): DataResult {
  if (state === "loading") return { status: "loading" };
  if (state === "error") return { status: "error" };
  if (state === "empty") return { status: "ready", portfolio: { ...seedPortfolio, positions: [] } };
  return { status: "ready", portfolio: seedPortfolio };
}
