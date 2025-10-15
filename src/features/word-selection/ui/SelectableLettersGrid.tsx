import { useCallback, useEffect } from "react";

import { LettersGrid } from "~/entities/game";
import { useDraggableSelection } from "../lib/useDraggableSelection";
import type { Position } from "~/shared/types";

interface SelectableLettersGridProps {
  size: number;
  letters: string[][];
  playedPositions: Position[];
  selectedPositions: Position[];
  highlightedPositions?: Position[];
  onSelectionChange?: (positions: Position[]) => void;
}

const defaultHighlightedPositions: Position[] = [];

function SelectableLettersGrid({
  size,
  letters,
  playedPositions,
  selectedPositions,
  highlightedPositions = defaultHighlightedPositions,
  onSelectionChange,
}: Readonly<SelectableLettersGridProps>) {
  const { startDragSelection, updateDragSelection, endDragSelection } =
    useDraggableSelection({
      onSelectionChange,
    });

  const isPositionSelected = useCallback(
    (row: number, col: number) => {
      return selectedPositions.some(
        (pos: Position) => pos.row === row && pos.col === col
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
      updateDragSelection(row, col);
    },
    [updateDragSelection]
  );

  const handleMouseUp = useCallback(() => {
    endDragSelection();
  }, [endDragSelection]);

  // Global mouse up handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      endDragSelection();
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [endDragSelection]);

  return (
    <LettersGrid
      size={size}
      letters={letters}
      playedPositions={playedPositions}
      highlightedPositions={highlightedPositions}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      isPositionSelected={isPositionSelected}
    />
  );
}

export { SelectableLettersGrid };
