import { clamp } from "~/shared/utils/utils";
import { fillRandomLetters, getRandomDirection } from "./helpers";
import { tryPlaceWord } from "./placement";
import type { Size } from "~/shared/types";

interface GenerateGridLettersProps {
  size: Size;
  words: string[];
}

function generateGridLetters({
  size,
  words,
}: Readonly<GenerateGridLettersProps>) {
  let letters: string[][] = [];
  console.log(`WORDS TO PLACE: ${words.flat()}`);

  let i = 0;
  while (i < words.length) {
    const word = words[i];
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100; // attempts per word

    while (!placed && attempts < maxAttempts) {
      const dir = getRandomDirection();

      const minRow = 0;
      const maxRow = size.height - (dir.dr === 0 ? 1 : word.length);
      const minCol = 0;
      const maxCol = size.width - (dir.dc === 0 ? 1 : word.length);

      const row = clamp(
        Math.floor(Math.random() * size.height),
        minRow,
        maxRow
      );
      const col = clamp(Math.floor(Math.random() * size.width), minCol, maxCol);

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
