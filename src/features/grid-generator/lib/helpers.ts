import { getRandomLetter } from "~/shared/utils";
import type { Direction, Size } from "~/shared/types";
import type { DirectionCounts } from "../model/types";

function getRandomDirection(): Direction {
  const directions: Direction[] = [
    { dr: 0, dc: 1 }, // horizontal right
    { dr: 1, dc: 0 }, // vertical down
    { dr: 1, dc: 1 }, // diagonal down-right
  ];

  return directions[Math.floor(Math.random() * directions.length)];
}

function getWeightedDirection(directionCounts: DirectionCounts): Direction {
  const { horizontal, vertical, diagonal } = directionCounts;
  const weights = {
    horizontal: horizontal <= Math.min(vertical, diagonal) ? 2 : 1,
    vertical: vertical <= Math.min(horizontal, diagonal) ? 2 : 1,
    diagonal: diagonal <= Math.min(horizontal, vertical) ? 2 : 1,
  };

  const directions = [
    { dir: { dr: 0, dc: 1 }, weight: weights.horizontal },
    { dir: { dr: 1, dc: 0 }, weight: weights.vertical },
    { dir: { dr: 1, dc: 1 }, weight: weights.diagonal },
  ];

  const totalWeight = directions.reduce((sum, d) => sum + d.weight, 0);
  let random = Math.random() * totalWeight;

  for (const d of directions) {
    random -= d.weight;
    if (random <= 0) {
      return d.dir;
    }
  }

  return directions[0].dir; // fallback
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

export { getRandomDirection, getWeightedDirection, fillRandomLetters };
