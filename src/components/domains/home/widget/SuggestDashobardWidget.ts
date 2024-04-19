import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`[width: calc(100% - 40px)] py-5 px-5 mx-auto rounded-2xl`}

  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.06), 0px 2px 10px 0px rgba(0, 0, 0, 0.03);
`;

export const Title = styled.div`
  ${tw`flex flex-row items-center justify-between mt-1 text-heading_01`}
`;

export const ItemWrraper = styled.div`
  ${tw`flex flex-row items-center px-1 py-2.5 text-body_02`}

  span {
    ${tw`inline-block`}
  }
`;

export const ItemTitle = styled.span`
  ${tw`ml-2`}
`;

export const ItemSubTitle = styled.span`
  ${tw`text-body_01 text-gray-600 ml-0.5`}
`;

export const CountText = styled.span`
  ${tw`ml-auto text-subhead_03 text-nego-800`}
`;

export const GoListButton = styled.button`
  ${tw`flex flex-row items-center justify-between ml-auto text-gray-600 text-info`}
`;

export const Line = styled.div`
  ${tw`w-full [min-height: 1px] bg-gray-200`}
`;

export const InterviewSectionWrraper = styled.div`
  ${tw`flex flex-row items-center justify-between text-gray-600 text-body_01`}
`;

export const GuideText = styled.div`
  ${tw`text-center text-gray-700 text-body_01`}
`;
