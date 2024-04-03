import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`pb-9`}
`;

export const HorizontalLine = styled.div`
  ${tw`w-px h-2 mx-1 bg-gray-300`}
`;

export const DetailText = styled.span`
  ${tw`text-gray-700 text-info`}
`;

export const RowCenterGapOne = styled.div`
  ${tw`flex flex-row items-center gap-1`}
`;

export const DanjiNameWrraper = styled.div`
  ${tw`flex flex-row items-center justify-between mb-2`}
`;
export const DanjiName = styled.span`
  ${tw`font-bold text-h3`}
`;

export const PaddingInlineWrraper = styled.div`
  ${tw`px-5`}
`;
