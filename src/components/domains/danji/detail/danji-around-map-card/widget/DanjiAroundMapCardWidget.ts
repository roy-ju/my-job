import tw, { styled } from 'twin.macro';

export const Box = styled.div`
  ${tw`flex`}
`;

export const PlaceNameWrraper = styled.div`
  ${tw`bg-white absolute rounded-[26px] h-[28px] left-[0px] pl-8`}
`;

export const PlaceNameText = styled.span`
  ${tw`pr-3 font-bold text-info whitespace-nowrap text-gray-1000`}
`;

export const styles = {
  bounce: tw`relative [z-index: 150] animate-bounce`,

  nonBounce: tw`relative [z-index: 140]`,
};
