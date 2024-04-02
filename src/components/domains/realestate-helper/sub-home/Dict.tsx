import { memo, useCallback, useMemo, useRef } from 'react';

import { theme } from 'twin.macro';

import { MarginTopFour } from '@/components/atoms/Margin';

import ButtonV2 from '@/components/atoms/ButtonV2';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { GuideListItem } from '@/services/sub-home/types';

import RelatedTermsImage from '@/../public/static/images/subhome_related_terms.png';

import IconArrowRight from '@/assets/icons/icon_arrow_right_20_1.svg';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';
import { DictContainer, DictWrraper, DictFirst, DictSecond } from './widget/SubHomeWidget';

import DictCarouselItem from './DictCarouselItem';

import Carousel from './widget/Carousel';

type DictProps = {
  list: GuideListItem[];
  handleNavigateDict: () => void;
  handleNavigateDictDetail: (id: number) => void;
};

function makeKey(v1: string, v2: string, v3: string, v4: number) {
  return `${v1}-${v2}-${v3}-${v4}`;
}

function DictTitle() {
  return (
    <DictWrraper>
      <DictFirst>부동산 용어사전</DictFirst>
      <DictSecond>부동산과 관련된 용어를 예시와 함께 설명해드려요.</DictSecond>
    </DictWrraper>
  );
}

function DictMoreButton({ handleClick }: { handleClick: () => void }) {
  return (
    <ButtonV2
      id={GOOGLE_TAG_BUTTON_ID.SUBHOME_DICTIONARY_MORE}
      variant="white"
      tw="w-full flex gap-0.5"
      size="bigger"
      radius="none"
      onClick={handleClick}
    >
      부동산 용어 더보기
      <IconArrowRight color={theme`colors.gray.600`} />
    </ButtonV2>
  );
}

function Dict({ list, handleNavigateDict, handleNavigateDictDetail }: DictProps) {
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

  const imageData = useMemo(
    () => ({
      id: 0,
      code: '',
      name: 'dummyData',
      parent_id: 0,
      content: '',
      additional_explanation: '',
      tip: '',
      warning: '',
      related_terms_ids: '',
      order_num: 0,
      created_time: '',
      children: null,
      thumb_file_path: RelatedTermsImage.src,
    }),
    [],
  );

  return (
    <DictContainer>
      <DictTitle />
      <MarginTopFour />
      <Carousel
        totalSlidesMarginRight={(list.length + 1) * 20}
        gap={16}
        trackStyle={{ padding: '20px 20px' }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {[imageData, ...list]
          ?.sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime())
          .slice(0, 6)
          .map((item, i) => (
            <DictCarouselItem
              key={makeKey(item.name || '', item.content || '', item.created_time || '', i)}
              item={item}
              isDragging={isDragging}
              handleNavigateDictAll={handleNavigateDict}
              handleNavigateDictDetail={() => handleNavigateDictDetail(item.id)}
            />
          ))}
      </Carousel>
      <MarginTopFour />
      <div tw="bg-gray-200 w-full [min-height: 1px]" />
      <DictMoreButton handleClick={handleNavigateDict} />
    </DictContainer>
  );
}

export default memo(Dict);
