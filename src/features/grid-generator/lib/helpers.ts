import { getRandomLetter } from "~/shared/utils/utils";
import type { Direction, Size } from "~/shared/types";

function getRandomDirection(): Direction {
  const directions: Direction[] = [
    { dr: 0, dc: 1 }, // horizontal right
    { dr: 1, dc: 0 }, // vertical down
    { dr: 1, dc: 1 }, // diagonal down-right
  ];

  return directions[Math.floor(Math.random() * directions.length)];
}

function fillRandomLetters(letters: string[][], { width, height }: Size) {
  for (let i = 0; i < width; i++) {
    if (!letters[i]) {
      letters[i] = [];
    }
    for (let j = 0; j < height; j++) {
      if (!letters[i][j]) {
        letters[i][j] = getRandomLetter();
      }
    }
  }
}

export { getRandomDirection, fillRandomLetters };
