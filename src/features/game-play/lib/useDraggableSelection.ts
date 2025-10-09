import { useCallback, useState } from "react";
import { useDrag } from "~/shared/hooks";
import type { Position } from "../model/types";

interface UseDraggableSelectionReturn {
  isDragging: boolean;
  dragStart: Position | null;
  startDragSelection: (row: number, col: number) => void;
  stopDragSelection: () => void;
  endDragSelection: () => void;
  onDragSelectionChange: (row: number, col: number) => void;
}

interface UseDraggableSelectionProps {
  onSelectionChange?: (positions: Position[]) => void;
}

function useDraggableSelection({
  onSelectionChange,
}: UseDraggableSelectionProps): UseDraggableSelectionReturn {
  const [dragStart, setDragStart] = useState<Position | null>(null);

  const { isDragging, startDragging, stopDragging } = useDrag();

  const startDragSelection = useCallback(
    (row: number, col: number) => {
      startDragging();
      setDragStart({ row, col });
      onSelectionChange?.([{ row, col }]);
    },
    [startDragging, onSelectionChange]
  );

  const stopDragSelection = useCallback(() => {
    stopDragging();
  }, [stopDragging]);

  const endDragSelection = useCallback(() => {
    stopDragging();
    setDragStart(null);
  }, [stopDragging]);

  const onDragSelectionChange = useCallback(
    (row: number, col: number) => {
      if (!isDragging || !dragStart) return;

      const newSelection: Position[] = [];
      const rowDiff = Math.abs(row - dragStart.row);
      const colDiff = Math.abs(col - dragStart.col);

      // Check if it's a valid straight line (horizontal, vertical, or diagonal)
      if (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) {
        const rowStep = row > dragStart.row ? 1 : row < dragStart.row ? -1 : 0;
        const colStep = col > dragStart.col ? 1 : col < dragStart.col ? -1 : 0;

        const steps = Math.max(rowDiff, colDiff);
        for (let i = 0; i <= steps; i++) {
          const currentRow = dragStart.row + rowStep * i;
          const currentCol = dragStart.col + colStep * i;
          newSelection.push({ row: currentRow, col: currentCol });
        }
      } else {
        // Not a straight line - just select current position
        newSelection.push({ row, col });
      }

      onSelectionChange?.(newSelection);
    },
    [onSelectionChange, dragStart, isDragging]
  );

  return {
    isDragging,
    dragStart,
    startDragSelection,
    stopDragSelection,
    endDragSelection,
    onDragSelectionChange,
  };
}

export { useDraggableSelection };
