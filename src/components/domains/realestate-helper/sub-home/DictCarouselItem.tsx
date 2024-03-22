import { MutableRefObject } from 'react';

import Image from 'next/image';

import { v1 } from 'uuid';

import { GuideListItem } from '@/services/sub-home/types';

import {
  MotionCarouselItemContainer,
  CarouselItemContainerTypeTwo,
  DictCarouselItemTextWrraper,
  DictCarouselItemTextTitle,
  DictCarouselItemTextSubTitle,
  Hashtag,
  HashtagWrraper,
} from './widget/SubHomeWidget';

type CarouselItemProps = {
  item: GuideListItem;
  isDragging: MutableRefObject<boolean>;
  handleNavigateDictAll: () => void;
  handleNavigateDictDetail: () => void;
};

export default function DictCarouselItem({
  item,
  isDragging,
  handleNavigateDictAll,
  handleNavigateDictDetail,
}: CarouselItemProps) {
  if (!item.id)
    return (
      <MotionCarouselItemContainer
        key={item.name}
        tw="w-[200px] [height: 220px]"
        onClick={() => {
          if (!isDragging.current) {
            handleNavigateDictAll();
          }
        }}
      >
        <CarouselItemContainerTypeTwo tw="h-full border-none">
          <Image src={item.thumb_file_path ?? ''} alt="dummyImage" width={200} height={220} />
        </CarouselItemContainerTypeTwo>
      </MotionCarouselItemContainer>
    );

  return (
    <MotionCarouselItemContainer
      key={item.name}
      tw="w-[360px] [height: 220px]"
      onClick={() => {
        if (!isDragging.current) {
          handleNavigateDictDetail();
        }
      }}
    >
      <CarouselItemContainerTypeTwo tw="h-full">
        <DictCarouselItemTextWrraper>
          <DictCarouselItemTextTitle>{item.name}</DictCarouselItemTextTitle>
          <DictCarouselItemTextSubTitle>{item.content}</DictCarouselItemTextSubTitle>
        </DictCarouselItemTextWrraper>

        {item?.related_terms && item.related_terms.length > 0 && (
          <div tw="[min-height: 1px] [width: calc(100% - 40px)] bg-gray-200 mx-5" />
        )}

        {item?.related_terms && item.related_terms.length > 0 && (
          <HashtagWrraper>
            {item.related_terms.map((i) => (
              <Hashtag key={v1()}>
                <span>#</span>
                <span>{i}</span>
              </Hashtag>
            ))}
          </HashtagWrraper>
        )}
      </CarouselItemContainerTypeTwo>
    </MotionCarouselItemContainer>
  );
}
