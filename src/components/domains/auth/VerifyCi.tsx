import tw, { styled } from 'twin.macro';

import Message from './verify-ci/Message';

import Ctas from './verify-ci/Ctas';

import ImageContents from './verify-ci/ImageContents';

const VerifyCiContainer = styled.div`
  ${tw`relative flex flex-col h-full gap-0.5`}
`;

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 h-full overflow-y-auto`}
`;

export default function VerifyCi() {
  return (
    <VerifyCiContainer>
      <Message />
      <FlexContents>
        <ImageContents />
      </FlexContents>
      <Ctas />
    </VerifyCiContainer>
  );
}
