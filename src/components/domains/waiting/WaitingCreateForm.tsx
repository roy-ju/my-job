import tw, { styled } from 'twin.macro';

import Message from './create-form/Message';

import ImageContents from './create-form/ImageContents';

import useWaitingFormRouteHandler from './create-form/hooks/useWaitingFormHandler';

import AlreadyCreated from './create-form/popups/AlreadyCreated';

const VerifyCiContainer = styled.div`
  ${tw`relative flex flex-col h-full gap-20`}
`;

export default function WaitingCreateForm() {
  const { openPopup, handleReplaceRouter } = useWaitingFormRouteHandler();

  return (
    <>
      <VerifyCiContainer>
        <Message />
        <ImageContents />
      </VerifyCiContainer>
      {openPopup && <AlreadyCreated handleClick={handleReplaceRouter} />}
    </>
  );
}
