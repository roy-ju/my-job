import tw, { styled } from 'twin.macro';

import Message from './Message';

import ImageContents from './ImageContents';

const VerifyCiContainer = styled.div`
  ${tw`relative flex flex-col h-full gap-0.5`}
`;

export default function VerifyCiSuccess() {
  return (
    <VerifyCiContainer>
      <Message />
      <ImageContents />
    </VerifyCiContainer>
  );
}
