import { getRandomLetter } from "~/shared/utils/utils";
import type { Direction, Size } from "~/shared/types";

function getRandomDirection(): Direction {
  const dr = Math.floor(Math.random() * 2);
  if (dr === 0) {
    return { dr, dc: 1 };
  }
  const dc = Math.floor(Math.random() * 2);

  return { dr, dc };
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
