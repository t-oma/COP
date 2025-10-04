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

export default function GameLettersGrid({ size }: { size: Size }) {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    // Generate letters only on client side to avoid hydration mismatch
    setLetters(gridLetters(size));
  }, [size.width, size.height]);

  // Show loading state or empty grid during SSR
  if (letters.length === 0) {
    return (
      <div
        className="grid flex-1"
        style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)` }}
      >
        {Array.from({ length: size.width * size.height }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-md bg-zinc-50"
          >
            <span className="text-2xl text-zinc-400">?</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid flex-1"
      style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)` }}
    >
      {letters.map((letter, index) => (
        <button
          type="button"
          key={`${letter}-${index}`}
          className="flex cursor-pointer items-center justify-center rounded-md hover:bg-zinc-100"
        >
          <span className="text-2xl">{letter}</span>
        </button>
      ))}
    </div>
  );
}
