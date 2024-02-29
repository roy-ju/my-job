import { useState } from 'react';

import { unRef } from '@/utils/unRef';

import { round } from '@/utils/is';

import useEventListener from './useEventListener';

export default function useScroll(
  target: MaybeRef<Element | null | undefined>,
  callback: (coords: { scrollX: number; scrollY: number; direction: 'up' | 'down' }) => void,
) {
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const getPositions = () => {
    const el = unRef(target);

    if (!el) return;

    const currentScrollY = el.scrollTop;

    const direction = currentScrollY > lastScrollY ? 'down' : 'up';

    setLastScrollY(currentScrollY);

    return {
      x: round(el.scrollLeft / (el.scrollWidth - el.clientWidth)),
      y: round(el.scrollTop / (el.scrollHeight - el.clientHeight)),
      direction: direction as 'up' | 'down',
    };
  };

  useEventListener(
    target,
    'scroll',
    () => {
      const newScrollValues = getPositions();
      if (!newScrollValues) return;

      const { x, y, direction } = newScrollValues;
      callback({ scrollX: x, scrollY: y, direction });
    },
    {
      capture: false,
      passive: true,
    },
  );
}
