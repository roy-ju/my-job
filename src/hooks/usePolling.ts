import { useEffect, useRef } from 'react';

function usePolling(callback: () => void, interval: number, stopAfter: number): void {
  const stopTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchDataAndScheduleNextPoll = () => {
      callback();

      if (stopAfter && stopAfter > 0 && stopTimer.current) {
        clearTimeout(stopTimer.current);
      }

      if (stopAfter && stopAfter > 0) {
        stopTimer.current = setTimeout(fetchDataAndScheduleNextPoll, interval);

        // stopAfter 시간이 지나면 중지
        const stopAfterMilliseconds = stopAfter * 1000 * 60;
        setTimeout(() => {
          if (stopTimer.current) {
            clearTimeout(stopTimer.current);
          }
        }, stopAfterMilliseconds);
      }
    };

    fetchDataAndScheduleNextPoll();

    return (): void => {
      if (stopTimer.current) {
        clearTimeout(stopTimer.current);
      }
    };
  }, [callback, interval, stopAfter]);
}

export default usePolling;
