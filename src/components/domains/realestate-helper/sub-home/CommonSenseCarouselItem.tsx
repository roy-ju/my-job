import { MutableRefObject } from 'react';

import useWindowOpen from '@/hooks/useWindowOpen';

import { GuideListItem } from '@/services/sub-home/types';

import {
  ImageWrraper,
  BackgroundImage,
  MotionCarouselItemContainer,
  CarouselItemContainer,
  CommonSenseCarouselItemTextWrraper,
  CommonSenseCarouselItemTextTitle,
  CommonSenseCarouselItemTextSubTitle,
} from './widget/SubHomeWidget';

type CarouselItemProps = {
  item: GuideListItem;
  isDragging: MutableRefObject<boolean>;
};

export default function CommonSenseCarouselItem({ item, isDragging }: CarouselItemProps) {
  const { openWindowWithLink } = useWindowOpen();

  return (
    <MotionCarouselItemContainer
      key={item.name}
      tw="w-[250px] hover:cursor-pointer"
      onClick={() => {
        if (!isDragging.current) {
          openWindowWithLink(item?.notion_url ?? '');
        }
      }}
    >
      <CarouselItemContainer>
        <ImageWrraper>
          <BackgroundImage
            style={{
              backgroundImage: `url(${item?.thumb_file_path ?? ''})`,
            }}
          />
        </ImageWrraper>
        <CommonSenseCarouselItemTextWrraper>
          <CommonSenseCarouselItemTextTitle>{item.name}</CommonSenseCarouselItemTextTitle>
          <CommonSenseCarouselItemTextSubTitle>{item.content}</CommonSenseCarouselItemTextSubTitle>
        </CommonSenseCarouselItemTextWrraper>
      </CarouselItemContainer>
    </MotionCarouselItemContainer>
  );
}
