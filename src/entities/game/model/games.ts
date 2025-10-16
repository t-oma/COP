import type { Game } from "./types";

export const games: Game[] = [
  {
    id: 1,
    title: "Weather",
    link: "/weather",
    size: 5,
    words: ["sun", "rain", "snow"],
    wordsCategory: "weather",
  },
  {
    id: 2,
    title: "Animals",
    link: "/animals",
    size: 7,
    words: ["cat", "dog", "bird", "fish", "snake"],
    wordsCategory: "animals",
  },
  {
    id: 3,
    title: "Colors",
    link: "/colors",
    size: 5,
    words: ["red", "blue", "green"],
    wordsCategory: "colors",
  },
  {
    id: 4,
    title: "Fruits",
    link: "/fruits",
    size: 7,
    words: ["apple", "banana", "orange", "grape", "lemon"],
    wordsCategory: "colors",
  },
  {
    id: 5,
    title: "Animals",
    link: "/animals",
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
    wordsCategory: "animals",
  },
];
