import React, { useCallback, useEffect } from 'react';

export function useInfiniteScroll(triggerRef: React.RefObject<HTMLElement>, callback: () => void) {
  const onIntersect: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    let ob: IntersectionObserver;
    if (triggerRef.current) {
      ob = new IntersectionObserver(onIntersect, { threshold: 0.4 });
      ob.observe(triggerRef.current);
    }
    return () => {
      if (ob) {
        ob.disconnect();
      }
    };
  }, [onIntersect, triggerRef]);
}
