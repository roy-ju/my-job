import { useCallback, useRef, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/atoms';

import { DragHandlers, motion, useAnimation } from 'framer-motion';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { DanjiPhotoItem } from '@/services/danji/types';

function swipePower(offset: number, absDistance: number) {
  return (offset / absDistance) * 100;
}

type PhotoHeroProps = {
  photoPaths: DanjiPhotoItem[];
  defaultPhotoPath: string | null;
  onClickViewPhotos?: () => void;
};

export default function PhotoHero({ photoPaths, defaultPhotoPath, onClickViewPhotos }: PhotoHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [rect, setRect] = useState<DOMRect>();

  const [page, setPage] = useState(0);

  const itemSize = photoPaths?.length ?? 0;

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref, photoPaths, defaultPhotoPath]);

  const animation = useAnimation();

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

  if (!itemSize && defaultPhotoPath) {
    return (
      <div tw="relative w-full [height: 256px]">
        <div
          tw="w-full h-full absolute z-10"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))`,
          }}
        />
        <Image priority quality={100} alt="기본 부동산 이미지" fill src={defaultPhotoPath} />
      </div>
    );
  }

  return (
    <div tw="relative w-full overflow-x-hidden">
      <motion.div
        key={page}
        ref={ref}
        drag={itemSize > 1 ? 'x' : undefined}
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={animation}
        variants={{
          toLeft: {
            x: '-100%',
            pointerEvents: 'none',
          },
          toRight: {
            x: '100%',
            pointerEvents: 'none',
          },
          center: {
            x: 0,
            pointerEvents: 'initial',
          },
        }}
        transition={{
          x: { type: 'spring', mass: 0.5, stiffness: 500, damping: 50 },
        }}
        tw="flex flex-row items-end justify-center"
      >
        <div tw="relative w-full [height: 256px]">
          <div
            tw="w-full h-full absolute z-10"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))`,
            }}
          />
          <Image priority fill src={photoPaths[page].full_file_path} alt="단지 사진" quality={75} tw="flex-1" />
        </div>
      </motion.div>

      <Button
        onClick={onClickViewPhotos}
        size="none"
        tw="z-20 rounded-bubble h-5 text-[10px] text-white px-2 bg-gray-1000/50 absolute bottom-3 right-5"
      >
        {page + 1} / {itemSize} 모두보기
      </Button>
    </div>
  );
}
