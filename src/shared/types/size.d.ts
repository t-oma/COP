import type { Sizes } from "../data/data";

export type Difficulty = "easy" | "medium" | "hard";

export type DifficultyNamedSizes = {
  easy: number;
  medium: number;
  hard: number;
};

export type AvailableSizes = (typeof Sizes)[number];

export type WordsCountForSize = {
  [key in AvailableSizes]: number;
};
