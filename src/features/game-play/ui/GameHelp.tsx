import { memo, useEffect, useRef, useState } from "react";

function GameHelp() {
  const [open, setOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const helpButtonRef = useRef<HTMLButtonElement>(null);

  const toggleHelp = () => {
    setOpen((prev) => !prev);
  };

  const closeHelp = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!helpRef.current) return;
      if (!helpButtonRef.current) return;
      if (helpRef.current.contains(event.target as Node)) return;
      if (helpButtonRef.current.contains(event.target as Node)) return;

      closeHelp();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeHelp();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="flex items-start justify-end gap-4">
      {open && (
        <section
          className="w-full max-w-md rounded-md bg-zinc-50 p-4 shadow"
          role="dialog"
          aria-labelledby="help-title"
          ref={helpRef}
        >
          <h2
            id="help-title"
            className="mb-3 text-lg font-semibold text-zinc-900"
          >
            Game Help
          </h2>
          <div className="space-y-2 text-sm text-zinc-700">
            <p>
              <strong>Objective:</strong> Find all hidden words in the letter
              grid.
            </p>
            <p>
              <strong>How to Play:</strong> Select letters with your mouse or
              touch to highlight words. Words can be placed horizontally,
              vertically, or diagonally.
            </p>
            <p>
              <strong>Rules:</strong>
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Words may overlap if the letters match.</li>
              <li>All words are in English.</li>
              <li>All words are singular nouns.</li>
              <li>
                Once a word is found, it will be highlighted and marked as
                found.
              </li>
              <li>The game ends when all words are discovered.</li>
            </ul>
            <p>
              <strong>Tips:</strong> If stuck, try looking for short words or
              words starting with common letters.
            </p>
          </div>
        </section>
      )}
      <button
        type="button"
        onClick={toggleHelp}
        aria-expanded={open}
        aria-controls="help-dialog"
        aria-label="Toggle game help"
        className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white p-1 hover:shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ref={helpButtonRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </button>
    </div>
  );
}

const GameHelpMemo = memo(GameHelp);

export { GameHelpMemo as GameHelp };
