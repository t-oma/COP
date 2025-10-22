import { useCallback, useEffect, useRef, useState } from "react";

export interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatTime: () => string;
}

export function useTimer(initialTime: number = 0): UseTimerReturn {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
  }, [initialTime]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [time]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    formatTime,
  };
}
