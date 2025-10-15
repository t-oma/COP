import type {
  DifficultyNamedSizes as DifficultyNS,
  NumberNamedSizes as NumberNS,
  Size,
} from "~/shared/types";

export const Sizes: readonly Size[] = Object.freeze([
  Object.freeze({ width: 5, height: 5 } as const),
  Object.freeze({ width: 7, height: 7 } as const),
  Object.freeze({ width: 9, height: 9 } as const),
] as const);

export const NumberNamedSizes: NumberNS = Object.freeze({
  "5x5": Sizes[0],
  "7x7": Sizes[1],
  "9x9": Sizes[2],
} as const);

export const DifficultyNamedSizes: DifficultyNS = Object.freeze({
  easy: /*  */ Sizes[0],
  medium: /**/ Sizes[1],
  hard: /*  */ Sizes[2],
} as const);
