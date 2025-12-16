import { useGamePlayStore } from "../model/game-store";

type SelectControlsProps = {
  handleSubmitWord: () => void;
};

function SelectControls({ handleSubmitWord }: Readonly<SelectControlsProps>) {
  const selectedPositions = useGamePlayStore(
    (state) => state.selectedPositions
  );
  const { resetSelectedPositions } = useGamePlayStore((state) => state.actions);

  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm text-zinc-600">
        Selected: {selectedPositions.length} letters
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSubmitWord}
          className="flex-1 rounded bg-green-500 px-3 py-1 text-sm text-white transition-colors hover:bg-green-600"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={resetSelectedPositions}
          className="flex-1 rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export { SelectControls };
