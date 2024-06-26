import { MutableRefObject } from 'react';

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
  handleNavigateCommonSenseDetail: (v: string) => void;
};

export default function CommonSenseCarouselItem({
  item,
  isDragging,
  handleNavigateCommonSenseDetail,
}: CarouselItemProps) {
  return (
    <MotionCarouselItemContainer
      key={item.name}
      tw="w-[250px] hover:cursor-pointer"
      onClick={() => {
        if (!isDragging.current) {
          handleNavigateCommonSenseDetail(item?.notion_url ?? '');
        }
      }}
    >
      <CarouselItemContainer>
        <ImageWrraper tw="[border-radius: 0px]">
          <BackgroundImage
            style={{
              borderRadius: '0px !important',
              backgroundImage: `url(${item?.thumb_file_path ?? ''})`,
            }}
          />
        </ImageWrraper>
        <CommonSenseCarouselItemTextWrraper>
          <CommonSenseCarouselItemTextTitle>{item.title}</CommonSenseCarouselItemTextTitle>
          <CommonSenseCarouselItemTextSubTitle>{item.content}</CommonSenseCarouselItemTextSubTitle>
        </CommonSenseCarouselItemTextWrraper>
      </CarouselItemContainer>
    </MotionCarouselItemContainer>
  );
}
