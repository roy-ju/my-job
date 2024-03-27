import tw, { styled } from 'twin.macro';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 h-full overflow-y-auto`}/* ${tw`relative flex flex-col flex-1 h-full overflow-y-hidden`} */
`;

export default FlexContents;
