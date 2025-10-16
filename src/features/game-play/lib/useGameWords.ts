import { useEffect, useState } from "react";

import { generateWords } from "./generateWords";
import type { Difficulty, WordsCategory } from "~/shared/types";

interface UseGameWordsProps {
  size: number;
  difficulty: Difficulty;
  category?: WordsCategory;
}

interface UseGameWordsReturn {
  words: string[];
}

function useGameWords({
  size,
  difficulty,
  category,
}: Readonly<UseGameWordsProps>): UseGameWordsReturn {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setWords(generateWords(size, difficulty, category));
  }, [size, difficulty, category]);

  return { words };
}

export { useGameWords };
