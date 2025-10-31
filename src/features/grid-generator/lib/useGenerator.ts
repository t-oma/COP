import { useEffect, useState } from "react";

import { generateWords } from "~/features/game-play";
import { generateGridLetters } from "./generator";
import type { Difficulty, WordsCategory } from "~/shared/types";

type UseGeneratorProps = {
  size: number;
  difficulty: Difficulty;
  category?: WordsCategory;
};

type UseGeneratorReturn = {
  words: string[];
  letters: string[][];
};

function useGenerator({
  size,
  difficulty,
  category,
}: Readonly<UseGeneratorProps>): UseGeneratorReturn {
  const [words, setWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[][]>([]);
  const [placedWords, setPlacedWords] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setWords(generateWords(size, difficulty, category));
  }, [size, difficulty, category]);

  useEffect(() => {
    const { letters, placedWords } = generateGridLetters({ words, size });
    setLetters(letters); // eslint-disable-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setPlacedWords(Array.from(placedWords)); // eslint-disable-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
  }, [words, size]);

  return { words: placedWords, letters };
}

export { useGenerator };
export type { UseGeneratorProps, UseGeneratorReturn };
