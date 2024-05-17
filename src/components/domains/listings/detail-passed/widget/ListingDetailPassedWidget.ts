import tw, { styled } from 'twin.macro';

export const ItemWrraper = styled.div`
  ${tw`px-5`}
`;

export const ButtonWrraper = styled.div`
  ${tw`flex gap-3 mt-7`}
`;

export const CurrentProgressWrraper = styled.div`
  ${tw`px-5 py-6 bg-gray-100 mt-7 mb-7 text-gray-1000`}
`;

export const CurrentProgressTitle = styled.div`
  ${tw`mb-4 text-subhead_03`}
`;

export const ColumnGap2 = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export const BodyO2Text = styled.div`
  ${tw`flex flex-row gap-3 text-body_02`}
`;

export const SmallTitle = styled.div`
  ${tw`[min-width: 84px]`}
`;

export const PassedAgentCardWrraper = styled.div`
  ${tw`px-5 mt-7`}
`;

export const PassedAgentCardTitle = styled.div`
  ${tw`mb-4 text-subhead_03`}
`;

export const CardWrraper = styled.div`
  ${tw`px-4 pt-5 pb-4 bg-gray-100 border border-gray-300 [border-top-left-radius: 8px] [border-top-right-radius: 8px] flex flex-col gap-4`}
`;

export const AgentInfoWrraper = styled.div`
  ${tw`flex flex-row gap-4`}
`;

export const AgentInfo = styled.div`
  ${tw`flex flex-col [width: calc(100% - 60px)]`}
`;

export const InfosWrraper = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export const Info = styled.div`
  ${tw`flex flex-row text-info`}

  span:nth-of-type(1) {
    ${tw`text-gray-700 [min-width: 52px] inline-block`}
  }
`;

export const PassedAgentCardButtonWrraper = styled.div`
  ${tw`bg-gray-100 border border-gray-300 border-t-0 [border-bottom-left-radius: 8px] [border-bottom-right-radius: 8px] [padding-block: 15px] cursor-pointer`}
`;
