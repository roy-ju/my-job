import tw, { styled } from 'twin.macro';

const OverflowDiv = styled.div`
  ${tw`[text-overflow: ellipsis] overflow-hidden whitespace-nowrap`}
`;

export default OverflowDiv;
