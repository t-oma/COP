import { clamp } from "~/shared/utils";
import { fillRandomLetters, getWeightedDirection } from "./helpers";
import { tryPlaceWord } from "./placement";
import type { DirectionCounts } from "../model/types";

interface GenerateGridLettersProps {
  size: number;
  words: string[];
}

function generateGridLetters({
  size,
  words,
}: Readonly<GenerateGridLettersProps>) {
  let letters: string[][] = [];
  console.log(`WORDS TO PLACE: ${words.flat()}`);

  const directionCounts: DirectionCounts = {
    horizontal: 0,
    vertical: 0,
    diagonal: 0,
  };

  let i = 0;
  while (i < words.length) {
    const word = words[i];
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100; // attempts per word

    while (!placed && attempts < maxAttempts) {
      const dir = getWeightedDirection(directionCounts);

      const minRow = 0;
      const maxRow = size - (dir.dr === 0 ? 1 : word.length);
      const minCol = 0;
      const maxCol = size - (dir.dc === 0 ? 1 : word.length);

      const row = clamp(Math.floor(Math.random() * size), minRow, maxRow);
      const col = clamp(Math.floor(Math.random() * size), minCol, maxCol);

      const { succeeded, result } = tryPlaceWord({
        letters,
        word,
        size,
        pos: { row, col },
        dir,
      });
      if (succeeded) {
        console.log(
          `PLACED ${word} AT ${row}, ${col} WITH DIRECTION {${dir.dr},${dir.dc}}`
        );
        letters = result;
        // Update direction count
        if (dir.dr === 0 && dir.dc === 1) directionCounts.horizontal++;
        else if (dir.dr === 1 && dir.dc === 0) directionCounts.vertical++;
        else if (dir.dr === 1 && dir.dc === 1) directionCounts.diagonal++;
        placed = true;
      }
      attempts++;
    }

    if (placed) {
      i++;
    } else {
      console.log(`FAILED TO PLACE ${word} after ${maxAttempts} attempts`);
      i++; // skip this word
    }
  }

  fillRandomLetters(letters, size);

  return letters;
}

export { generateGridLetters };
