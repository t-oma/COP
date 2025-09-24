export type Level = {
  id: number;
  title: string;
  link: string;
  difficulty: "easy" | "medium" | "hard";
  words: string[];
};
