import { useCallback, useRef } from 'react';

import { MarginTopFour } from '@/components/atoms/Margin';

import TextButton from '@/components/atoms/TextButton';

import { Carousel } from '@/components/molecules';

import { GuideListItem } from '@/services/sub-home/types';

import { CommonSenseContainer, CommonSenseWrraper, CommonSenseFirst, CommonSenseSecond } from './widget/SubHomeWidget';

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

function CommonSenseMoreButton({ handleClick }: { handleClick: () => void }) {
  return (
    <TextButton
      title="부동산 상식 더보기"
      variant="right"
      color="gray700"
      size="large"
      tw="w-full text-center border-t border-t-gray-200 [padding-block: 17px]"
      onClick={handleClick}
    />
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

      <Carousel gap={20} trackStyle={{ padding: '20px 20px' }} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
      <MarginTopFour />
      <CommonSenseMoreButton handleClick={handleNavigateCommonSense} />
    </CommonSenseContainer>
  );
}
