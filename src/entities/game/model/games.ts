import type { Game } from "./types";

export const games: Game[] = [
  {
    id: 1,
    title: "Weather",
    link: "/weather",
    difficulty: "easy",
    size: 5,
    words: ["sun", "rain", "snow"],
  },
  {
    id: 2,
    title: "Animals",
    link: "/animals",
    difficulty: "medium",
    size: 7,
    words: ["cat", "dog", "bird", "fish", "snake"],
  },
  {
    id: 3,
    title: "Colors",
    link: "/colors",
    difficulty: "easy",
    size: 5,
    words: ["red", "blue", "green"],
  },
  {
    id: 4,
    title: "Fruits",
    link: "/fruits",
    difficulty: "medium",
    size: 7,
    words: ["apple", "banana", "orange", "grape", "lemon"],
  },
  {
    id: 5,
    title: "Animals",
    link: "/animals",
    difficulty: "hard",
    size: 9,
    words: [
      "penguin",
      "shrimp",
      "octopus",
      "dolphin",
      "shark",
      "oyster",
      "turtle",
      "lobster",
      "seagull",
    ],
  },
];
