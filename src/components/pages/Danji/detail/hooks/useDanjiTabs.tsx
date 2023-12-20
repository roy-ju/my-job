import { useState, useRef, useCallback } from 'react';

export default function useDanjiTabs() {
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const [startX, setStartX] = useState<number>();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const refs = useRef<any>([]);

  const onDragStart = useCallback((e: NegocioMouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    e.preventDefault();

    setIsDrag(true);

    setStartX(e.pageX + scrollRef.current.scrollLeft);
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDrag(false);
  }, []);

  const onDragMove = useCallback(
    (e: NegocioMouseEvent<HTMLDivElement>) => {
      if (!isDrag) return;

      if (isDrag && scrollRef.current && startX) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

        scrollRef.current.scrollLeft = startX - e.pageX;

        if (scrollLeft === 0) {
          setStartX(e.pageX);
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          setStartX(e.pageX + scrollLeft);
        }
      }
    },
    [isDrag, startX],
  );

  return { scrollRef, refs, onDragStart, onDragEnd, onDragMove };
}
