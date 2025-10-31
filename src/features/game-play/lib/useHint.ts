import { useCallback, useState } from "react";

import { previewVector } from "~/shared/utils";
import type { Direction, Position } from "~/shared/types";

type UseHintProps = {
  size: number;
  words: string[];
  foundWords: string[];
  letters: string[][];
  hintLength?: number; // 0 for full word, otherwise first N letters
};

type UseHintReturn = {
  highlightedPositions: Position[];
  hintsUsed: number;
  findWordPositions: (word: string) => Position[] | null;
  handleHint: () => void;
};

const hintsLimit = 3;

/**
 * Finds hints for the given word
 *
 * @param size - size of the grid
 * @param words - list of all words
 * @param foundWords - list of found words
 * @param letters - letters grid
 * @param hintLength - length of hint to show, 0 for full word, otherwise first N letters
 */
function useHint({
  size,
  words,
  foundWords,
  letters,
  hintLength = 0,
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

      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
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
    if (hintsUsed >= hintsLimit || highlightedPositions.length > 0) return; // limit to 3 hints and prevent overlapping hints

    const remainingWords = words.filter((w) => !foundWords.includes(w));
    if (remainingWords.length === 0) return;

    const randomWord =
      remainingWords[Math.floor(Math.random() * remainingWords.length)];
    const positions = findWordPositions(randomWord);
    if (positions) {
      const positionsToHighlight =
        hintLength > 0 ? positions.slice(0, hintLength) : positions;
      setHighlightedPositions(positionsToHighlight);
      setHintsUsed((prev) => prev + 1);
      setTimeout(() => setHighlightedPositions([]), 3000); // highlight for 3 seconds
    }
  }, [
    findWordPositions,
    foundWords,
    hintsUsed,
    words,
    hintLength,
    highlightedPositions,
  ]);

  return {
    highlightedPositions,
    hintsUsed,
    findWordPositions,
    handleHint,
  };
}

export { useHint };
export type { UseHintProps, UseHintReturn };
