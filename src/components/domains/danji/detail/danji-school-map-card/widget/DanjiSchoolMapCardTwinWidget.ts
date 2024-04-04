import tw, { styled } from 'twin.macro';

import Button from '@/components/atoms/Button';

import { Typography } from './DanjiSchoolMapCardWidget';

export const Container = styled.div`
  ${tw`relative flex-1 w-full`}
`;

export const SchoolInfoTableHeadWrraper = styled.div`
  ${tw`flex flex-row gap-2 mb-5`}
`;

export const LoadingDiv = styled.div`
  ${tw`[min-height: 136px] [max-height: 136px]`}
`;

export const SelectButton = styled(Button)`
  ${tw`[border-radius: 22px] [scroll-snap-align: center] whitespace-nowrap`}
`;

export const Message = styled(Typography)`
  ${tw`min-w-full [min-height: 136px] [max-height: 136px] text-b2 [line-height: 20px] text-gray-300 [text-align: center]`}
`;

export const DanjiAroundSchoolListWrraper = styled.div`
  ${tw`[min-height: 136px] [max-height: 136px]`}
`;

export const NameText = styled(Typography)`
  ${tw`text-body_02 [line-height: 20px] text-gray-1000 ml-1`}
`;

export const DistanceText = styled(Typography)`
  ${tw`text-body_02 [line-height: 20px] text-gray-1000 ml-auto`}
`;

export const RowCenter = styled.div`
  ${tw`flex flex-row items-center`}
`;

SelectButton.defaultProps = {
  variant: 'outlined',
  size: 'small',
};
