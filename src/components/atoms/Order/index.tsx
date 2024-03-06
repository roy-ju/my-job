import tw, { styled } from 'twin.macro';

export const OrderWrraper = styled.div`
  ${tw`w-6 h-6 [border-radius: 50%] bg-nego-800 relative`}
`;

export const OrderText = styled.span`
  ${tw`absolute text-white -translate-x-1/2 -translate-y-1/2 text-subhead_03 top-1/2 left-1/2`}
`;
