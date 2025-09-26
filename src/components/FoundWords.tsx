import { Game } from "@/types";

export default function FoundWords({ game }: { game: Game }) {
  return (
    <section className="flex w-52 flex-col items-center gap-4 border-r border-zinc-300 bg-zinc-100 p-4">
      <h2>Found words:</h2>

      <ul className="flex w-full flex-col py-4">
        {game?.words.map((word, i) => (
          <li
            key={word}
            className="flex items-center justify-between gap-2 p-2"
          >
            <span>{i + 1}: </span>
            <span>{word}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
