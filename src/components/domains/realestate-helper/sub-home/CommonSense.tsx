import { memo, useCallback, useRef } from 'react';

import { theme } from 'twin.macro';

import { MarginTopFour } from '@/components/atoms/Margin';

import ButtonV2 from '@/components/atoms/ButtonV2';

import IconArrowRight from '@/assets/icons/icon_arrow_right_20_1.svg';

import { GuideListItem } from '@/services/sub-home/types';

import IconButton from '@/components/atoms/IconButton';

import useCheckPlatform from '@/hooks/useCheckPlatform';
import {
  CommonSenseContainer,
  CommonSenseWrraper,
  CommonSenseFirst,
  CommonSenseSecond,
  MoreButtonWrraper,
} from './widget/SubHomeWidget';

import CommonSenseCarouselItem from './CommonSenseCarouselItem';

import Carousel from './widget/Carousel';

type CommonSenseProps = {
  list: GuideListItem[];
  handleNavigateCommonSense: () => void;
  handleNavigateCommonSenseDetail: (v: string) => void;
};

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
    <ButtonV2 variant="white" tw="w-full flex gap-0.5" size="bigger" radius="none" onClick={handleClick}>
      더보기
      <IconArrowRight color={theme`colors.gray.600`} />
    </ButtonV2>
  );
}

function CommonSense({ list, handleNavigateCommonSense, handleNavigateCommonSenseDetail }: CommonSenseProps) {
  const { platform } = useCheckPlatform();

  const isDragging = useRef(false);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;

    const element = document.getElementById('negocio-subhome-container-div-box');

    if (element && platform === 'mobile') {
      element.style.overflow = 'hidden';
    }
  }, [platform]);

  const handleDragEnd = useCallback(() => {
    const element = document.getElementById('negocio-subhome-container-div-box');

    if (element && platform === 'mobile') {
      element.style.overflow = 'auto';
    }

    setTimeout(() => {
      isDragging.current = false;
    }, 300);
  }, [platform]);

  return (
    <CommonSenseContainer>
      <CommonSenseTitle />
      <MarginTopFour />
      <Carousel
        gap={20}
        totalSlidesMarginRight={list.slice(0, 5).length * 30}
        trackStyle={{ padding: '20px 20px' }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        renderRightButtonIsNotIntersection={() => (
          <MoreButtonWrraper onClick={handleNavigateCommonSense}>
            <IconButton variant="primary" tw="mb-1" />
            <span>더보기</span>
          </MoreButtonWrraper>
        )}
      >
        {list.slice(0, 5).map((item, i) => (
          <CommonSenseCarouselItem
            key={makeKey(item.name || '', item.content || '', item.created_time || '', i)}
            item={item}
            isDragging={isDragging}
            handleNavigateCommonSenseDetail={handleNavigateCommonSenseDetail}
          />
        ))}
      </Carousel>
      <MarginTopFour />
      <div tw="bg-gray-200 w-full [min-height: 1px]" />
      <CommonSenseMoreButton handleClick={handleNavigateCommonSense} />
    </CommonSenseContainer>
  );
}

export default memo(CommonSense);
