import type { AvailableSizes, WordsCategory } from "~/shared/types";

export type Game = {
  id: number;
  title: string;
  link: string;
  size: AvailableSizes;
  wordsCategory: WordsCategory;
};
