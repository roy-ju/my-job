/* eslint-disable @next/next/no-img-element */
import { useState, useMemo, MutableRefObject } from 'react';

import { motion } from 'framer-motion';

import { NewsItem as NewsItemType } from '@/lib/scrape/scrape';

import Paths from '@/constants/paths';

import moment from 'moment';

type CarouselItemProps = { item: NewsItemType; isDragging: MutableRefObject<boolean> };

export default function CarouselItem({ item, isDragging }: CarouselItemProps) {
  const [imgError, setImgError] = useState(false);

  const imgSrc = useMemo(() => {
    if (imgError) return Paths.DEFAULT_APARTMENT_IMAGE_PATH;

    if (item?.imageUrl) return item.imageUrl;

    return Paths.DEFAULT_APARTMENT_IMAGE_PATH;
  }, [item, imgError]);

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      key={item.title}
      tw="w-[160px] hover:cursor-pointer"
      onClick={() => {
        if (!isDragging.current) {
          window.open(item.originallink || item.link, '_blank');
        }
      }}
    >
      <div tw="relative w-40 [height: 90px]">
        <img
          tw="w-full h-full absolute top-0 left-0 [object-fit: cover] rounded-lg border border-gray-300"
          alt=""
          src={imgSrc}
          onError={() => setImgError(true)}
        />
      </div>

      <div
        tw="text-info line-clamp-2 my-1.5 text-gray-900"
        dangerouslySetInnerHTML={{ __html: item.title }}
        className="news-title"
      />

      {item.pubDate && <div tw="text-info text-gray-700">{moment(item.pubDate).format('YYYY-MM-DD')}</div>}
    </motion.div>
  );
}
