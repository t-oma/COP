import { useEffect, useState } from "react";
import type { Size } from "~/shared/types";
import { getRandomLetter } from "~/shared/utils/utils";

function gridLetters({ width, height }: Size) {
  const letters = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      letters.push(getRandomLetter());
    }
  }
  return letters;
}

interface GameLettersGridProps {
  size: Size;
}

function GameLettersGrid({ size }: GameLettersGridProps) {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    // Generate letters only on client side to avoid hydration mismatch
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setLetters(gridLetters(size));
  }, [size]);

  // Show loading state or empty grid during SSR
  if (letters.length === 0) {
    return (
      <div
        className="bg-accent-background grid flex-1 rounded-md p-4"
        style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)` }}
      >
        {Array.from({ length: size.width * size.height }).map((_, index) => {
          const row = Math.floor(index / size.width);
          const col = index % size.width;
          return (
            <div
              key={`placeholder-${row}-${col}`}
              className="flex items-center justify-center rounded-md bg-zinc-50"
            >
              <span className="text-2xl text-zinc-400">?</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="bg-accent-background grid flex-1 rounded-md p-4"
      style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)` }}
    >
      {letters.map((letter, index) => {
        const row = Math.floor(index / size.width);
        const col = index % size.width;
        return (
          <button
            type="button"
            key={`letter-${row}-${col}-${letter}`}
            className="flex cursor-pointer items-center justify-center rounded-md hover:bg-zinc-50"
          >
            <span className="text-2xl">{letter}</span>
          </button>
        );
      })}
    </div>
  );
}

export { GameLettersGrid };
