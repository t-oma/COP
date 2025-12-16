import { memo, useEffect } from "react";

import { LettersGrid } from "~/entities/game";
import { useGamePlayStore } from "~/features/game-play";
import { useDraggableSelection } from "../lib/useDraggableSelection";
import type { Position } from "~/shared/types";

type SelectableLettersGridProps = {
  size: number;
  letters: string[][];
  highlightedPositions?: Position[];
};

const defaultHighlightedPositions: Position[] = [];

function SelectableLettersGrid({
  size,
  letters,
  highlightedPositions = defaultHighlightedPositions,
}: Readonly<SelectableLettersGridProps>) {
  const { setSelectedPositions } = useGamePlayStore((state) => state.actions);

  const { startDragSelection, updateDragSelection, endDragSelection } =
    useDraggableSelection({
      onSelectionChange: setSelectedPositions,
    });

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
      highlightedPositions={highlightedPositions}
      onMouseDown={startDragSelection}
      onMouseEnter={updateDragSelection}
      onMouseUp={endDragSelection}
    />
  );
}

const SelectableLettersGridMemo = memo(SelectableLettersGrid);

export { SelectableLettersGridMemo as SelectableLettersGrid };
