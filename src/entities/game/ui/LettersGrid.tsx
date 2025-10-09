import { useCallback, useEffect, useRef, useState } from "react";
import { useDraggableSelection, type Position } from "~/features/game-play";
import type { Size } from "~/shared/types";
import { getRandomLetter } from "~/shared/utils/utils";
import { GridWidth } from "~/widgets";

function gridLetters({ width, height }: Size) {
  const letters = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      letters.push(getRandomLetter());
    }
  }
  return letters;
}

const EMPTY_POSITIONS: Position[] = [];

interface LettersGridProps {
  size: Size;
  selectedPositions?: Position[];
  onSelectionChange?: (positions: Position[]) => void;
}

function LettersGrid({
  size,
  selectedPositions = EMPTY_POSITIONS,
  onSelectionChange,
}: Readonly<LettersGridProps>) {
  const [letters, setLetters] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  const {
    startDragSelection,
    stopDragSelection,
    endDragSelection,
    onDragSelectionChange,
  } = useDraggableSelection({
    onSelectionChange,
  });

  useEffect(() => {
    // Generate letters only on client side to avoid hydration mismatch
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setLetters(gridLetters(size));
  }, [size]);

  const isPositionSelected = useCallback(
    (row: number, col: number) => {
      return selectedPositions.some(
        (pos) => pos.row === row && pos.col === col
      );
    },
    [selectedPositions]
  );

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      startDragSelection(row, col);
    },
    [startDragSelection]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      onDragSelectionChange(row, col);
    },
    [onDragSelectionChange]
  );

  const handleMouseUp = useCallback(() => {
    endDragSelection();
  }, [endDragSelection]);

  // Global mouse up handler
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  // Show loading state or empty grid during SSR
  if (letters.length === 0) {
    return (
      <GridWidth width={size.width}>
        {Array.from({ length: size.width * size.height }).map((_, index) => {
          const row = Math.floor(index / size.width);
          const col = index % size.width;
          return (
            <div
              key={`placeholder-${row}-${col}`}
              className="flex items-center justify-center rounded-md"
            >
              <span className="text-2xl text-zinc-400">?</span>
            </div>
          );
        })}
      </GridWidth>
    );
  }

  return (
    <div
      ref={gridRef}
      className="flex flex-1 select-none"
      onMouseLeave={stopDragSelection}
    >
      <GridWidth width={size.width}>
        {letters.map((letter, index) => {
          const row = Math.floor(index / size.width);
          const col = index % size.width;
          const isSelected = isPositionSelected(row, col);

          return (
            <button
              type="button"
              key={`letter-${row}-${col}-${letter}`}
              className={`flex cursor-pointer items-center justify-center rounded-md transition-colors select-none ${
                isSelected
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "hover:bg-zinc-50"
              }`}
              onMouseDown={() => handleMouseDown(row, col)}
              onMouseEnter={() => handleMouseEnter(row, col)}
              onMouseUp={handleMouseUp}
            >
              <span className="text-2xl">{letter}</span>
            </button>
          );
        })}
      </GridWidth>
    </div>
  );
}

export { LettersGrid };
