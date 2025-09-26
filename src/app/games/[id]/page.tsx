import { DifficultyNamedSizes, games } from "@/app/_lib/data";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { getRandomLetter } from "@/lib/utils";
import { Size } from "@/types";

const gameId = 1;
const game = games.find((game) => game.id === gameId);
const words = game!.words;
const size = DifficultyNamedSizes[game!.difficulty];

function gridLetters({ width, height }: Size) {
  const letters = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      letters.push(getRandomLetter());
    }
  }
  return letters;
}

export default function GamePage() {
  return (
    <>
      <AppHeader />

      <main className="flex flex-1 flex-col">
        <div className="flex items-center px-10 py-4">
          <h1 className="text-xl font-semibold">{game?.title}</h1>
        </div>

        <div
          className="grid flex-1 px-28 py-8"
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
      </main>

      <AppFooter />
    </>
  );
}
