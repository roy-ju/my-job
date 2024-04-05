import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`px-5`}
`;

export const TitleWrraper = styled.div`
  ${tw`mb-4`}
`;

export const Title = styled.span`
  ${tw`text-subhead_03 [line-height: 1] [letter-spacing: -0.4px]`}
`;

export const DetailWrraper = styled.div`
  ${tw`mt-6`}
`;

export const DetailTitle = styled.span`
  ${tw`text-subhead_03 [line-height: 1]`}
`;

export const TradeTurnrateWrraper = styled.div`
  ${tw`flex items-center justify-between mt-6 py-[1.125rem] [border-radius: 0.5rem] px-4 bg-gray-100`}
`;

export const TradeTurnrateTitleWrraper = styled.div`
  ${tw`flex items-center gap-2`}
`;

export const TradeTurnrateContentsWrraper = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export const TradeTurnrateTitle = styled.span`
  ${tw`text-body_02 [line-height: 1.25rem]`}
`;

export const TradeTurnrateContentsTitle = styled.span`
  ${tw`font-bold text-b1 [line-height: 1] [text-align: right]`}
`;

export const AverageText = styled.span`
  ${tw`text-info text-gray-700 [line-height: 1] [text-align: right]`}
`;

export const NamesWrraper = styled.div`
  ${tw`flex items-center justify-center mt-3 bg-gray-100 gap-2 py-2.5`}
`;

export const Name = styled.div`
  ${tw`flex items-center gap-1.5`}

  span {
    ${tw`[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap`}
  }
`;
