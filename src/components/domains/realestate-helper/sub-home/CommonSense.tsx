import { useCallback, useRef } from 'react';

import { MarginTopFour } from '@/components/atoms/Margin';

import { Carousel } from '@/components/molecules';

import { GuideListItem } from '@/services/sub-home/types';

import IconButton from '@/components/atoms/IconButton';

import {
  CommonSenseContainer,
  CommonSenseWrraper,
  CommonSenseFirst,
  CommonSenseSecond,
  MoreButtonWrraper,
} from './widget/SubHomeWidget';

import CommonSenseCarouselItem from './CommonSenseCarouselItem';

type CommonSenseProps = { list: GuideListItem[]; handleNavigateCommonSense: () => void };

function makeKey(v1: string, v2: string, v3: string, v4: number) {
  return `${v1}-${v2}-${v3}-${v4}`;
}

function CommonSenseTitle() {
  return (
    <CommonSenseWrraper>
      <CommonSenseFirst>부동산 상식</CommonSenseFirst>
      <CommonSenseSecond>가장 중요하지만, 가장 어려운 부동산 상식의 모든 것!</CommonSenseSecond>
    </CommonSenseWrraper>
  );
}

export default function CommonSense({ list, handleNavigateCommonSense }: CommonSenseProps) {
  const isDragging = useRef(false);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    setTimeout(() => {
      isDragging.current = false;
    }, 300);
  }, []);

  return (
    <CommonSenseContainer>
      <CommonSenseTitle />
      <MarginTopFour />
      <Carousel
        gap={20}
        trackStyle={{ padding: '20px 20px' }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        renderRightButtonIsRightIntersection={() => (
          <MoreButtonWrraper onClick={handleNavigateCommonSense}>
            <IconButton variant="primary" tw="mb-1" />
            <span>더보기</span>
          </MoreButtonWrraper>
        )}
      >
        {list
          ?.sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime())
          .slice(0, 5)
          .map((item, i) => (
            <CommonSenseCarouselItem
              key={makeKey(item.name || '', item.content || '', item.created_time || '', i)}
              item={item}
              isDragging={isDragging}
            />
          ))}
      </Carousel>
    </CommonSenseContainer>
  );
}
