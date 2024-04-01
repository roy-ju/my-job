import tw, { styled } from 'twin.macro';

export const ColumnGap3 = styled.div`
  ${tw`flex flex-col gap-3`}
`;

export const FlexContents = styled.div`
  ${tw`flex-1 min-h-0 px-5 pt-8 pb-8 overflow-y-auto`}
`;

export const TitleWrraper = styled.div`
  ${tw`px-5 py-10`}

  p:nth-of-type(1) {
    ${tw`text-b1 font-bold [line-height: 16px] mb-3`}
  }
`;

export const Title = styled.p`
  ${tw`text-b1 font-medium [line-height: 20px]`}
`;

export const SubTitle = styled.p`
  ${tw`text-info text-gray-700 [line-height: 20px]`}
`;

export const Info = styled.p`
  ${tw`font-bold text-b1`}
`;

export const SecondInfo = styled.p`
  ${tw`my-3 text-gray-700 text-info`}
`;
