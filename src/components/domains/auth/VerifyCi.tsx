import tw, { styled } from 'twin.macro';

import Message from './verify-ci/Message';

import Ctas from './verify-ci/Ctas';

import ImageContents from './verify-ci/ImageContents';

const VerifyCiContainer = styled.div`
  ${tw`relative flex flex-col h-full gap-0.5`}
`;

export default function VerifyCi() {
  return (
    <VerifyCiContainer>
      <Message />
      <ImageContents />
      <Ctas />
    </VerifyCiContainer>
  );
}
