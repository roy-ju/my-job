import tw, { styled } from 'twin.macro';

export const Nickname = styled.div`
  ${tw`mb-4 text-heading_02`}
`;

const Info = styled.div`
  ${tw`text-gray-700 text-info`}
`;

export const Content = styled(Info)`
  ${tw`leading-none mb-7`}
`;

export const Time = styled(Info)`
  ${tw`mb-4`}
`;
