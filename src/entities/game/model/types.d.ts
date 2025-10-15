import type { Sizes } from "~/shared/data/data";

export type Game = {
  id: number;
  title: string;
  link: string;
  size: (typeof Sizes)[number];
  words: string[];
};
