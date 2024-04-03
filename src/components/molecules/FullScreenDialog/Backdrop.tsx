import tw, { styled } from 'twin.macro';

export const Container = styled.div`
  ${tw`absolute pointer-events-none left-0 top-0 w-[100vw] h-[100%] [z-index: -1]`}
`;

export default function Backdrop() {
  return <Container />;
}
