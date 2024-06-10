import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import Button from '@/components/atoms/Button';

export const Container = styled.div`
  ${tw`px-5 mt-10`}
`;

export const TitleWrraper = styled.div`
  ${tw`flex items-center justify-between mb-3`}
`;

export const Title = styled.span`
  ${tw`text-subhead_03 [line-height: 20px] [letter-spacing: -0.4px]`}
`;

export const BuyUi = styled.div`
  ${tw`flex items-center gap-2`}
`;

export const Wrraper = styled.div`
  ${tw`[height: 2.75rem] px-1 py-1 bg-gray-200 [border-radius: 0.5rem] flex items-center gap-1 overflow-x-hidden`}
`;

export const ButtonWrraper = styled.div``;

export const PyoungListButton = styled(Button)`
  ${tw`relative z-20 [min-width: 90px] h-9 text-gray-700 whitespace-nowrap`}
`;

export const PyoungListButtonWithJyb = styled(Button)`
  ${tw`relative z-20 [min-width: 95px] h-9 text-gray-700 whitespace-nowrap`}
`;

export const PyoungListButtonIndicator = styled(motion.div)`
  ${tw`absolute top-0 left-0 z-10 pointer-events-none`}
`;

export const PyoungListButtonWithJybIndicator = styled(motion.div)`
  ${tw`absolute top-0 left-0 z-10 pointer-events-none`}
`;

export const IndicatorUi = styled.div`
  ${tw`w-full h-full [min-width: 90px] [min-height: 36px] bg-white rounded-lg shadow-[0px_6px_12px_rgba(0,0,0,0.08)] flex justify-center items-center`}
`;

export const IndicatorWithJybUi = styled.div`
  ${tw`w-full h-full [min-width: 95px] [min-height: 36px] bg-white rounded-lg shadow-[0px_6px_12px_rgba(0,0,0,0.08)] flex justify-center items-center`}
`;

export const AverageText = styled.span`
  ${tw`absolute top-0 left-0 z-20 [min-width: 90px] [min-height: 36px] flex items-center justify-center`}
`;

export const GonggeupText = styled.span`
  ${tw`absolute top-0 left-0 z-20 [min-width: 95px] [min-height: 36px] flex items-center justify-center`}
`;

export const ContentsWrraper = styled.div`
  ${tw`flex justify-center items-center gap-2 bg-gray-100 mt-4 py-[9px] [border-radius: 0.5rem]`}
`;

export const WolsaeText = styled.span`
  ${tw`mt-3 text-gray-700 [font-size: 10px] [line-height: 1]`}
`;

export const Seperator = styled.div`
  ${tw`w-px h-2 bg-gray-300`}
`;
export const ContentText = styled.span`
  ${tw`text-info text-gray-700 [line-height: 0.875rem] [letter-spacing: -0.4px]`}
`; 