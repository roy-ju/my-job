import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

export const ProcessContainer = styled.div`
  ${tw`pt-8 pb-0`}
`;

export const Seperator = styled(SeperatorV2)`
  ${tw`[min-height: 12px] h-3 mb-5`}
`;

export const LastVirtualDiv = styled.div`
  ${tw`[min-height: 20px]`}
`;

export const ProcessTitleWrraper = styled.div`
  ${tw`flex flex-col gap-1 px-5`}
`;

export const ProcessImageContainer = styled.div`
  ${tw`flex [height: 378px] w-full overflow-hidden cursor-pointer`}
`;

export const ProcessTitleFirst = styled.span`
  ${tw`text-heading_02`}
`;

export const ProcessTitleSecond = styled.span`
  ${tw`text-gray-700 text-body_02`}
`;

export const RequiredContainer = styled.div`
  ${tw`py-8`}
`;

export const RequiredTitle = styled.span`
  ${tw`inline-block ml-5 text-heading_03`}
`;

export const RequiredTitleHighlight = styled.span`
  ${tw`text-heading_03 text-nego-800`}
`;

export const ColorBox = styled.div`
  ${tw`relative [border-top-left-radius: 16px] [border-bottom-left-radius: 16px] ml-5 [width: calc(100% - 20px)] pl-5 pt-6 pb-5`}
`;

export const Column = styled.div`
  ${tw`flex flex-col gap-3`}
`;

export const RequiredItemContainer = styled.button`
  ${tw`text-left [height: 134px] flex items-end`}

  img {
    ${tw`absolute [bottom: 46px] right-6`}
  }
`;

export const CommonSenseContainer = styled.div`
  ${tw`pt-8 pb-3`}
`;

export const CommonSenseWrraper = styled.div`
  ${tw`flex flex-col gap-1 px-5`}
`;

export const CommonSenseFirst = styled.span`
  ${tw`text-heading_02`}
`;

export const CommonSenseSecond = styled.span`
  ${tw`text-gray-700 text-body_02`}
`;

export const ImageWrraper = styled.div`
  ${tw`w-full [border-top-left-radius: 16px] [border-top-right-radius: 16px]`}
`;

export const BackgroundImage = styled.div`
  ${tw`[border-top-left-radius: 16px] [border-top-right-radius: 16px] w-full h-[128px] bg-no-repeat bg-center bg-cover`}
`;

export const MotionCarouselItemContainer = styled(motion.div)`
  ${tw`w-[250px] hover:cursor-pointer`}
`;

export const CarouselItemContainer = styled.div`
  ${tw`border border-gray-300 rounded-2xl [box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.03);]`}
`;

export const CarouselItemContainerTypeTwo = styled.div`
  ${tw`border border-gray-200 rounded-2xl`}
`;

export const CommonSenseCarouselItemTextWrraper = styled.div`
  ${tw`flex flex-col gap-1 p-5`}
`;

export const CommonSenseCarouselItemTextTitle = styled.p`
  ${tw`text-subhead_03`}
`;

export const CommonSenseCarouselItemTextSubTitle = styled.p`
  ${tw`text-gray-800 whitespace-pre-line text-body_02 line-clamp-2`}
`;

export const DictContainer = styled.div`
  ${tw`py-8`}
`;

export const DictWrraper = styled.div`
  ${tw`flex flex-col gap-1 px-5`}
`;

export const DictFirst = styled.span`
  ${tw`text-heading_02`}
`;

export const DictSecond = styled.span`
  ${tw`text-gray-700 text-body_02`}
`;

export const DictCarouselItemTextWrraper = styled.div`
  ${tw`flex flex-col gap-2 p-5`}
`;

export const DictCarouselItemTextTitle = styled.p`
  ${tw`text-heading_02`}
`;

export const DictCarouselItemTextSubTitle = styled.p`
  ${tw`text-gray-700 text-body_02 [height: 72px] line-clamp-3`}
`;

export const HashtagWrraper = styled.div`
  ${tw`flex flex-wrap gap-3 px-5 py-5`}
`;

export const Hashtag = styled.div`
  ${tw`flex flex-row items-center gap-0.5 justify-center bg-gray-100 [padding-block: 5px] px-3 [border-radius: 100px] text-gray-700 text-body_01`}
`;

export const MoreButtonWrraper = styled.div`
  /* ${tw`absolute top-1/2 right-0 -translate-y-1/2 z-10 px-1.5 text-center text-gray-600 text-body_02 cursor-pointer`} */
  ${tw`px-3 my-auto text-center text-gray-600 cursor-pointer text-body_02 h-fit`}
`;
