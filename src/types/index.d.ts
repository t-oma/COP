export type Difficulty = "easy" | "medium" | "hard";

export type Game = {
  id: number;
  title: string;
  link: string;
  difficulty: Difficulty;
  words: string[];
};
