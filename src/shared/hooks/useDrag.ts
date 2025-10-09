import { useCallback, useState } from "react";

interface UseDrag {
  isDragging: boolean;
  startDragging: () => void;
  stopDragging: () => void;
}

function useDrag(): UseDrag {
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = useCallback(() => {
    setIsDragging(true);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    startDragging,
    stopDragging,
  };
}

export { useDrag };
