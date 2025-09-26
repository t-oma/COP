import { getRandomLetter } from "@/lib/utils";
import { Size } from "@/types";

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
  return (
    <div
      className="grid flex-1"
      style={{ gridTemplateColumns: `repeat(${size.width}, 1fr)` }}
    >
      {gridLetters(size).map((letter, index) => (
        <button
          key={`${letter}-${index}`}
          className="flex cursor-pointer items-center justify-center rounded-md hover:bg-zinc-100"
        >
          <span className="text-2xl">{letter}</span>
        </button>
      ))}
    </div>
  );
}
