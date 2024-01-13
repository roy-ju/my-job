import { useCallback, useRef } from 'react';

import { Carousel, Skeletons } from '@/components/molecules';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { renderLeftButton, renderRightButton } from './RenderButtons';

import useFetchNews from './hooks/useFetchNews';

import CarouselItem from './CarouselNewsItem';

function makeKey(v1: string, v2: string, v3: string, v4: number) {
  return `${v1}-${v2}-${v3}-${v4}`;
}

export default function CarouselType({ title = 'Todays`s Pick!', query }: { title?: string; query: string }) {
  const { news, loading, error } = useFetchNews({ query, page: 1, display: 15 });

  const { platform } = useCheckPlatform();

  const isDragging = useRef(false);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    setTimeout(() => {
      isDragging.current = false;
    }, 300);
  }, []);

  if (error) return null;

  return (
    <div tw="flex flex-col gap-1 pt-10 pb-6">
      <div tw="flex items-center gap-2 px-5">
        <h2 tw="text-heading_02">{title}</h2>
      </div>
      {loading ? (
        <div tw="flex justify-center gap-4 py-4 pb-5">
          {[1, 2].map((item) => (
            <Skeletons.NewsItemType2 key={item} />
          ))}
        </div>
      ) : (
        <Carousel
          gap={16}
          trackStyle={{ padding: '16px 20px' }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          renderLeftButton={platform === 'pc' ? renderLeftButton : undefined}
          renderRightButton={platform === 'pc' ? renderRightButton : undefined}
        >
          {news.map((item, index) => (
            <CarouselItem
              key={makeKey(item.title || '', item.pubDate || '', item.description || '', index)}
              item={item}
              isDragging={isDragging}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
}
