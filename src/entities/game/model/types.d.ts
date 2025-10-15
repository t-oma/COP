import type { AvailableSizes } from "~/shared/types";

export type Game = {
  id: number;
  title: string;
  link: string;
  size: AvailableSizes;
  words: string[];
};
