import tw, { styled } from 'twin.macro';

import Button from '@/components/atoms/Button';

export const Container = styled.div`
  ${tw`w-full pt-10 pb-10 px-5 [min-height: 590px]`}
`;

export const TitleWrraper = styled.div`
  ${tw`flex items-center justify-between w-full`}
`;

export const Title = styled.div`
  ${tw`text-subhead_03 [line-height: 1]`}
`;

export const ScrollContainer = styled.div`
  ${tw`flex items-center [column-gap: 4px] pt-4 pb-4 overflow-x-scroll overflow-y-hidden [-webkit-overflow-scrolling: touch] [padding-right: 1px]`}
`;

export const DetailCategoryButton = styled(Button)`
  ${tw`[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap`}
`;

DetailCategoryButton.defaultProps = {
  variant: 'outlined',
  size: 'medium',
};

export const NodataWrraper = styled.div`
  ${tw`mt-11`}
`;

export const LoadingWrraper = styled.div`
  ${tw`min-w-full [min-height: 9.5125rem]`}
`;

export const MapWrraper = styled.div`
  ${tw`relative my-4`}
`;

export const NameText = styled.span`
  ${tw`ml-2 text-body_02`}
`;

export const DistanceText = styled.span`
  ${tw`ml-auto text-body_02 text-gray-1000`}
`;

export const ListContainer = styled.div`
  ${tw`mt-4`}
`;

export const ListItem = styled.div<{ isFirst: boolean }>`
  ${tw`flex items-center`}
  ${({ isFirst }) =>
    isFirst
      ? tw`[border-top: 1px solid #F4F6FA] [border-bottom: 1px solid #F4F6FA] px-4 py-[8px]`
      : tw`[border-bottom: 1px solid #F4F6FA] px-4 py-[8.5px]`}
`;
