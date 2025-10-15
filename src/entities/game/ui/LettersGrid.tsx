import { useRef } from "react";

import { cn } from "~/shared/utils/cn";
import { GridWidth } from "~/widgets";
import type { Position, Size } from "~/shared/types";

interface LettersGridProps {
  size: Size;
  letters: string[][];
  playedPositions: Position[];
  highlightedPositions?: Position[];
  onMouseDown?: (row: number, col: number) => void;
  onMouseEnter?: (row: number, col: number) => void;
  onMouseUp?: () => void;
  isPositionSelected?: (row: number, col: number) => boolean;
}

const defaultHighlightedPositions: Position[] = [];

function LettersGrid({
  size,
  letters,
  playedPositions,
  highlightedPositions = defaultHighlightedPositions,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  isPositionSelected,
}: LettersGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

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
      onMouseLeave={() => onMouseUp?.()}
    >
      <GridWidth width={size.width}>
        {letters.map((row, rowIndex) => {
          return row.map((letter, colIndex) => {
            const row = rowIndex;
            const col = colIndex;
            const isSelected = isPositionSelected?.(row, col);
            const isPlayed = playedPositions.some(
              (pos: Position) => pos.row === row && pos.col === col
            );
            const isHighlighted = highlightedPositions.some(
              (pos: Position) => pos.row === row && pos.col === col
            );

            return (
              <button
                type="button"
                key={`letter-${row}-${col}-${letter}`}
                className={cn(
                  "flex cursor-pointer items-center justify-center transition-colors select-none hover:bg-zinc-50",
                  {
                    "bg-yellow-300/50 text-black": isHighlighted,
                    "rounded-none bg-zinc-300": isPlayed,
                    "bg-blue-500 text-white hover:bg-blue-600": isSelected,
                  }
                )}
                onMouseDown={() => onMouseDown?.(row, col)}
                onMouseEnter={() => onMouseEnter?.(row, col)}
                onMouseUp={() => onMouseUp?.()}
              >
                <span className="text-2xl">{letter}</span>
              </button>
            );
          });
        })}
      </GridWidth>
    </div>
  );
}

export { LettersGrid };
