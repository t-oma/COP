import type { UseTimerReturn } from "~/shared/hooks";

type GameTimerProps = {
  timer: UseTimerReturn;
};

function GameTimer({ timer }: Readonly<GameTimerProps>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="font-mono text-2xl font-bold text-zinc-900">
          {timer.formatTime()}
        </span>
        <span className="text-sm text-zinc-500">Time</span>
      </div>
    </div>
  );
}

export { GameTimer };
