import type { DifficultyNamedSizes as DifficultyNS } from "~/shared/types";

export const Sizes: readonly number[] = Object.freeze([5, 7, 9] as const);

export const DifficultyNamedSizes: DifficultyNS = Object.freeze({
  easy: /*  */ Sizes[0],
  medium: /**/ Sizes[1],
  hard: /*  */ Sizes[2],
} as const);
