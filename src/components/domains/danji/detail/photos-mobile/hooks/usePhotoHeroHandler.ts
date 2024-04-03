import { useState, useRef, useMemo, useCallback } from 'react';

import { DanjiPhotoItem } from '@/services/danji/types';

import { AnimationControls, DragHandlers, useIsomorphicLayoutEffect } from 'framer-motion';
import swipePower from '../utils/swipePower';

export default function usePhotoHeroHandler({
  photoPaths,
  defaultPhotoPath,
  animation,
}: {
  photoPaths: DanjiPhotoItem[];
  defaultPhotoPath: string | null;
  animation: AnimationControls;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [rect, setRect] = useState<DOMRect>();

  const [page, setPage] = useState(0);

  const itemSize = useMemo(() => photoPaths?.length ?? 0, [photoPaths]);

  const getNextPage = useCallback(
    (currentPage: number, offset: number) => {
      const minPage = 0;
      const maxPage = itemSize - 1;
      let nextPage = currentPage + offset;

      if (nextPage < minPage) {
        nextPage = maxPage;
      } else if (nextPage > maxPage) {
        nextPage = minPage;
      }

      return nextPage;
    },
    [itemSize],
  );

  const paginate = useCallback(
    (offset: number) => {
      setPage((prev) => getNextPage(prev, offset));
    },
    [getNextPage],
  );

  const handleDragEnd = useCallback<NonNullable<DragHandlers['onDragEnd']>>(
    async (_, { offset }) => {
      if (!rect) return;

      const power = swipePower(offset.x, rect.width);

      if (power > 20) {
        await animation.start('toRight');
        paginate(-1);
      } else if (power < -20) {
        await animation.start('toLeft');
        paginate(1);
      }
    },
    [rect, animation, paginate],
  );

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref, photoPaths, defaultPhotoPath]);

  return { ref, rect, page, itemSize, handleDragEnd };
}
