import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import Button from '@/components/atoms/Button';

export const ListContainer = styled.div`
  ${tw`[min-height: 105px] [max-height: 105px] overflow-y-auto`}
`;

export const BottomSheetContent = styled.div`
  overflow: ' auto';

  ${tw`overflow-auto [-webkit-overflow-scrolling: touch] [min-height: 105px] [margin-bottom: 43px] pl-5 [padding-right: 21px] mt-4`}

  &::-webkit-scrollbar {
    display: 'none';
  }
`;

export const Stack = styled.div`
  ${tw`flex flex-row items-center`}
`;

export const Message = styled.p`
  ${tw`text-gray-700 text-body_02 [line-height: 20px] [min-height: 105px] [max-height: 105px] [z-index: 131] text-center`}
`;

export const EmptyMessage = styled(Message)`
  ${tw`text-gray-700 text-body_02 [line-height: 20px] min-w-full [min-height: 105px] [max-height: 105px]`}
`;

export const DistanceText = styled.p`
  ${tw`text-body_02 [line-height: 20px] [letter-spacing: -0.4px] `}
`;

export const ButtonWrraper = styled.div`
  ${tw`flex items-center [column-gap: 8px] pt-4 pb-4 overflow-x-scroll [z-index: 130] [-webkit-overflow-scrolling: touch] [padding-right: 1px]`}
`;

export const DetailCategoryButton = styled(Button)`
  ${tw`[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap`}
`;

export const AroundDanjiDetailFooter = styled.div`
  ${tw`flex flex-row items-center pl-5 pr-5`}
`;

export const RelativeFlex = styled.div`
  ${tw`relative flex-1 w-full`}
`;

DetailCategoryButton.defaultProps = {
  variant: 'outlined',
  size: 'medium',
};

export const Wrapper = styled(motion.div)`
  ${tw`w-full flex flex-col [z-index: 131] left-auto right-auto [border-top-left-radius: 20px] [border-top-right-radius: 20px] bg-white m-auto [transition:ease-out]`}

  transition: 'transform 300ms ease-out'
`;

export const commonStyle = {
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  borderBottom: '1px solid #E4E4EF',
};
