import { memo } from "react";

type GameHintProps = {
  handleHint: () => void;
  hintsUsed: number;
  disabled?: boolean;
};

const MAX_HINTS = 3;

function GameHint({
  handleHint,
  hintsUsed,
  disabled,
}: Readonly<GameHintProps>) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleHint}
        disabled={hintsUsed >= MAX_HINTS || disabled}
        className="inline-flex cursor-pointer items-center justify-center rounded-md bg-white px-2 py-2 hover:shadow focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-400"
      >
        <span className="text-xs">Hint ({MAX_HINTS - hintsUsed} left)</span>
      </button>
    </div>
  );
}

const GameHintMemo = memo(GameHint);

export { GameHintMemo as GameHint };
