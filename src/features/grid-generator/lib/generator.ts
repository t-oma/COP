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

  let retryLimit = 500;
  let i = 0;
  while (i < words.length && retryLimit > 0) {
    const word = words[i];
    const dir = getRandomDirection();

    const maxRow = size.height - (dir.dr === 0 ? 1 : word.length);
    const maxCol = size.width - (dir.dc === 0 ? 1 : word.length);

    const row = clamp(Math.floor(Math.random() * size.height), 0, maxRow);
    const col = clamp(Math.floor(Math.random() * size.width), 0, maxCol);

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
      i++;
    } else {
      retryLimit--;
    }
  }

  fillRandomLetters(letters, size);

  return letters;
}

export { generateGridLetters };
