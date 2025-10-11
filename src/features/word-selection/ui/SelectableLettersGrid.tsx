import { useCallback, useEffect } from "react";
import { LettersGrid } from "~/entities/game";
import type { Position, Size } from "~/shared/types";
import { useDraggableSelection } from "../lib/useDraggableSelection";

interface SelectableLettersGridProps {
  size: Size;
  selectedPositions: Position[];
  onSelectionChange?: (positions: Position[]) => void;
}

function SelectableLettersGrid({
  size,
  selectedPositions,
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
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      isPositionSelected={isPositionSelected}
    />
  );
}

export { SelectableLettersGrid };
