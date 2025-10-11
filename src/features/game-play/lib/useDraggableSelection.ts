import { useCallback, useState } from "react";
import type { Position } from "../model/types";

interface UseDraggableSelectionReturn {
  isDragging: boolean;
  dragStart: Position | null;
  startDragSelection: (row: number, col: number) => void;
  updateDragSelection: (row: number, col: number) => void;
  endDragSelection: () => void;
  resetSelection: () => void;
}

interface UseDraggableSelectionProps {
  onSelectionChange?: (positions: Position[]) => void;
}
function useDraggableSelection({
  onSelectionChange,
}: UseDraggableSelectionProps): UseDraggableSelectionReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position | null>(null);

  const startDragSelection = useCallback(
    (row: number, col: number) => {
      const startPos = { row, col };
      setIsDragging(true);
      setDragStart(startPos);
      onSelectionChange?.([startPos]);
    },
    [onSelectionChange]
  );

  const updateDragSelection = useCallback(
    (row: number, col: number) => {
      if (!isDragging || !dragStart) return;

      const endPos = { row, col };
      const newSelection = calculateLineSelection(dragStart, endPos);

      onSelectionChange?.(newSelection);
    },
    [isDragging, dragStart, onSelectionChange]
  );

  const endDragSelection = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
    // Keep selectedPositions for submission
  }, []);

  const resetSelection = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  return {
    isDragging,
    dragStart,
    startDragSelection,
    updateDragSelection,
    endDragSelection,
    resetSelection,
  };
}

export { useDraggableSelection };

/**
 * Calculates positions for a straight line selection (horizontal, vertical, or diagonal)
 */
function calculateLineSelection(
  startPos: Position,
  endPos: Position
): Position[] {
  const positions: Position[] = [];
  const rowDiff = Math.abs(endPos.row - startPos.row);
  const colDiff = Math.abs(endPos.col - startPos.col);

  // Check if it's a valid straight line
  if (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) {
    const rowStep =
      endPos.row > startPos.row ? 1 : endPos.row < startPos.row ? -1 : 0;
    const colStep =
      endPos.col > startPos.col ? 1 : endPos.col < startPos.col ? -1 : 0;

    const steps = Math.max(rowDiff, colDiff);
    for (let i = 0; i <= steps; i++) {
      positions.push({
        row: startPos.row + rowStep * i,
        col: startPos.col + colStep * i,
      });
    }
  } else {
    // Not a straight line - just select end position
    positions.push(endPos);
  }

  return positions;
}
