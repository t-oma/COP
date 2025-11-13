import { memo } from "react";
import { useNavigate } from "react-router";

import { useGamePlayStore } from "~/features/game-play";
import { AppModal } from "~/widgets";
import type { UseTimerReturn } from "~/shared/hooks";
import type { AppModalProps } from "~/widgets";

type ResultsModalProps = Pick<AppModalProps, "open"> & {
  timer: UseTimerReturn;
  totalWords: string[];
};

function ResultsModal({
  open,
  timer,
  totalWords,
}: Readonly<ResultsModalProps>) {
  const foundWords = useGamePlayStore((state) => state.foundWords);
  const navigate = useNavigate();

  const handleRestart = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <AppModal open={open} closeOnBackdropClick={false}>
      <div className="flex w-[50vw] max-w-xl flex-col gap-6">
        <h3 className="text-xl font-semibold">Game Completed!</h3>

        <div className="flex flex-col gap-4">
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-zinc-900">
              {timer.formatTime()}
            </div>
            <div className="text-sm text-zinc-500">Time</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900">
              {foundWords.length} / {totalWords.length}
            </div>
            <div className="text-sm text-zinc-500">Words Found</div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Play Again
          </button>
          <button
            type="button"
            onClick={handleGoHome}
            className="flex-1 rounded-md bg-zinc-200 px-4 py-2 text-zinc-900 hover:bg-zinc-300 focus:ring-2 focus:ring-zinc-500 focus:outline-none"
          >
            Home
          </button>
        </div>
      </div>
    </AppModal>
  );
}

const ResultsModalMemo = memo(ResultsModal);

export { ResultsModalMemo as ResultsModal };
