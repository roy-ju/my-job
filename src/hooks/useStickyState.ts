import { useState, useEffect, useRef, RefObject } from 'react';

export default function useStickyState({
  containerRef,
  stickyThreshold = 0,
}: {
  containerRef: RefObject<HTMLDivElement>;
  stickyThreshold?: number;
}): [React.RefObject<HTMLDivElement>, boolean] {
  const elementRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef?.current) return;

    const checkIfSticky = () => {
      if (elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();

        setIsSticky(top <= stickyThreshold);
      }
    };

    containerRef.current.addEventListener('scroll', checkIfSticky);

    return () => {
      if (containerRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeEventListener('scroll', checkIfSticky);
      }
    };
  }, [containerRef, stickyThreshold]);

  return [elementRef, isSticky];
}
