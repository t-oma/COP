type SelectControlsProps = {
  selectedLength: number;
  handleSubmitWord: () => void;
  handleResetSelection: () => void;
};

function SelectControls({
  selectedLength,
  handleSubmitWord,
  handleResetSelection,
}: Readonly<SelectControlsProps>) {
  return (
    <div className="mt-4 space-y-2">
      <div className="text-sm text-zinc-600">
        Selected: {selectedLength} letters
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
          onClick={handleResetSelection}
          className="flex-1 rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export { SelectControls };
