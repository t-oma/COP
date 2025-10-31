import type { WordsCategory } from "~/shared/types";

export type Game = {
  id: number;
  title: string;
  link: string;
  wordsCategory: WordsCategory;
  icon?: string;
};
