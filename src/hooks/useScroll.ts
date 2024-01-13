import { unRef } from '@/utils/unRef';

import { round } from '@/utils/is';

import useEventListener from './useEventListener';

export default function useScroll(
  target: MaybeRef<Element | null | undefined>,
  callback: (coords: { scrollX: number; scrollY: number }) => void,
) {
  const getPositions = () => {
    const el = unRef(target);

    if (!el) return;

    return {
      x: round(el.scrollLeft / (el.scrollWidth - el.clientWidth)),
      y: round(el.scrollTop / (el.scrollHeight - el.clientHeight)),
    };
  };

  useEventListener(
    target,
    'scroll',
    () => {
      const newScrollValues = getPositions();
      if (!newScrollValues) return;

      const { x, y } = newScrollValues;
      callback({ scrollX: x, scrollY: y });
    },
    {
      capture: false,
      passive: true,
    },
  );
}
