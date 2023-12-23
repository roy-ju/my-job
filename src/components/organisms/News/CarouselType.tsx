import { useCallback, useRef, useState } from 'react';

import { useIsomorphicLayoutEffect } from '@/hooks/utils';

import { NewsItem, scrapeNews } from '@/lib/scrape/scrape';

import Link from 'next/link';

import { Carousel } from '@/components/molecules';

import { checkPlatform } from '@/utils/checkPlatform';

import { motion } from 'framer-motion';

import { renderLeftButton, renderRightButton } from './RenderButtons';

export default function CarouselType() {
  const [news, setNews] = useState<NewsItem[]>([]);

  const [mobileOrPc, setMobileOrPc] = useState<string>('');

  const isDragging = useRef(false);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    setTimeout(() => {
      isDragging.current = false;
    }, 300);
  }, []);

  useIsomorphicLayoutEffect(() => {
    async function scrape() {
      const response = await scrapeNews({ query: '반포자이', display: 10, start: 1, sort: 'date' });
      if (response) {
        setNews(response);
      }
    }

    scrape();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (checkPlatform() === 'pc') {
      setMobileOrPc('pc');
    } else if (checkPlatform() === 'mobile') {
      setMobileOrPc('mobile');
    }
  }, []);

  if (!news.length) return null;

  return (
    <div tw="flex flex-col gap-10">
      <Carousel
        gap={16}
        trackStyle={{ padding: '16px 20px' }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        renderLeftButton={mobileOrPc === 'pc' ? renderLeftButton : undefined}
        renderRightButton={mobileOrPc === 'pc' ? renderRightButton : undefined}
      >
        {news.map((item) => (
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            key={item.title}
            tw="w-[160px] hover:cursor-pointer"
            onClick={() => {
              if (!isDragging.current) {
                //
              }
            }}
          >
            <div
              tw="w-full h-[120px] rounded-[12px] bg-center bg-cover bg-no-repeat mb-3"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('${
                  item.imageUrl ?? ''
                }')`,
              }}
            />

            <div tw="text-heading_01 whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</div>

            <div tw="text-info whitespace-nowrap overflow-hidden text-ellipsis">{item.description}</div>

            <div tw="text-info whitespace-nowrap overflow-hidden text-ellipsis">{item.pubDate}</div>

            <Link
              href={item.originallink || item.link}
              target="_blank"
              tw="text-info text-blue-1000 [text-decoration: underline]"
            >
              뉴스보러가기
            </Link>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
}
