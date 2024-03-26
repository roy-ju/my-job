import tw, { styled } from 'twin.macro';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 h-full overflow-x-hidden overflow-y-auto`}

  -webkit-transform: translateZ(0);
`;

export default FlexContents;
