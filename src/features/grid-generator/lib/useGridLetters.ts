import { useEffect, useState } from "react";

import { generateGridLetters } from "~/features/grid-generator";

interface UseGridLettersProps {
  words: string[];
  size: number;
}

interface UseGridLettersReturn {
  letters: string[][];
}

function useGridLetters({
  words,
  size,
}: Readonly<UseGridLettersProps>): UseGridLettersReturn {
  const [letters, setLetters] = useState<string[][]>([]);

  useEffect(() => {
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setLetters(generateGridLetters({ words, size }));
  }, [words, size]);

  return { letters };
}

export { useGridLetters };
