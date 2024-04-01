import { RefObject, useEffect } from 'react';

const useRestoreScrollPosition = (elementRef: RefObject<HTMLDivElement>, key: string) => {
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem(key);

    if (scrollPosition && elementRef) {
      elementRef.current?.scrollTo(0, Number(scrollPosition));

      sessionStorage.removeItem(key);
    }
  }, [elementRef, key]);
};

export default useRestoreScrollPosition;
