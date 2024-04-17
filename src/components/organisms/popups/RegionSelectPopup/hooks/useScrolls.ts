import { useRef, useState, MouseEvent, useCallback, MutableRefObject, useEffect } from 'react';

export default function useScrolls({ scrollRef }: { scrollRef: React.ForwardedRef<HTMLDivElement> }) {
  const refs = useRef<any>([]);

  const [isDrag, setIsDrag] = useState<boolean>(false);

  const [startX, setStartX] = useState<number>();

  const onDragStart = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const container = (scrollRef as MutableRefObject<HTMLDivElement>)?.current;

      if (!container) return;

      e.preventDefault();

      setIsDrag(true);
      setStartX(e.pageX + container.scrollLeft);
    },
    [scrollRef],
  );

  const onDragEnd = useCallback(() => {
    setIsDrag(false);
  }, []);

  const onDragMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isDrag) return;

      const container = (scrollRef as MutableRefObject<HTMLDivElement>)?.current;

      if (isDrag && container && startX) {
        const { scrollWidth, clientWidth, scrollLeft } = container;

        container.scrollLeft = startX - e.pageX;

        if (scrollLeft === 0) {
          setStartX(e.pageX);
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          setStartX(e.pageX + scrollLeft);
        }
      }
    },
    [isDrag, scrollRef, startX],
  );

  return { refs, onDragStart, onDragEnd, onDragMove };
}
