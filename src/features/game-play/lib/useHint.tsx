import { useCallback, useState } from "react";

import { previewVector } from "~/shared/utils/matrix";
import type { Direction, Position, Size } from "~/shared/types";

interface UseHintProps {
  size: Size;
  words: string[];
  foundWords: string[];
  letters: string[][];
}

interface UseHintReturn {
  highlightedPositions: Position[];
  hintsUsed: number;
  findWordPositions: (word: string) => Position[] | null;
  handleHint: () => void;
}

const hitsLimit = 3;

function useHint({
  size,
  words,
  foundWords,
  letters,
}: Readonly<UseHintProps>): UseHintReturn {
  const [highlightedPositions, setHighlightedPositions] = useState<Position[]>(
    []
  );
  const [hintsUsed, setHintsUsed] = useState(0);

  const findWordPositions = useCallback(
    (word: string): Position[] | null => {
      const wordUpper = word.toUpperCase();
      const directions: Direction[] = [
        { dr: 0, dc: 1 }, // horizontal
        { dr: 1, dc: 0 }, // vertical
        { dr: 1, dc: 1 }, // diagonal
      ];

      for (let row = 0; row < size.height; row++) {
        for (let col = 0; col < size.width; col++) {
          for (const dir of directions) {
            const vector = previewVector({ row, col }, dir, word.length);
            if (vector.length !== word.length) continue;

            const foundWord = vector
              .map((pos) => letters[pos.row]?.[pos.col] || "")
              .join("");
            if (foundWord === wordUpper) {
              return vector;
            }
          }
        }
      }
      return null;
    },
    [letters, size]
  );

  const handleHint = useCallback(() => {
    if (hintsUsed >= hitsLimit) return; // limit to 3 hints

    const remainingWords = words.filter((w) => !foundWords.includes(w));
    if (remainingWords.length === 0) return;

    const randomWord =
      remainingWords[Math.floor(Math.random() * remainingWords.length)];
    const positions = findWordPositions(randomWord);
    if (positions) {
      setHighlightedPositions(positions);
      setHintsUsed((prev) => prev + 1);
      setTimeout(() => setHighlightedPositions([]), 3000); // highlight for 3 seconds
    }
  }, [findWordPositions, foundWords, hintsUsed, words]);

  return {
    highlightedPositions,
    hintsUsed,
    findWordPositions,
    handleHint,
  };
}

export { useHint };
