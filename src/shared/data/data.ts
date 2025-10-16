import type { WordsCountForSize as WCFS } from "../types";

export const Sizes: readonly [5, 7, 9] = Object.freeze([5, 7, 9] as const);

export const DifficultyNamedSizes = Object.freeze({
  easy: /*  */ Sizes[0],
  medium: /**/ Sizes[1],
  hard: /*  */ Sizes[2],
} as const);

export const SizeNamedDifficulties = Object.freeze({
  5: "easy",
  7: "medium",
  9: "hard",
} as const);

export const GridNotation = Object.freeze({
  easy: "5x5",
  medium: "7x7",
  hard: "9x9",
} as const);

export const WordsCountForSize: WCFS = {
  5: 3,
  7: 4,
  9: 7,
};
