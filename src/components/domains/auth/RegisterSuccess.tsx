import tw, { styled } from 'twin.macro';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import Message from './register-success/Message';

import Ctas from './register-success/Ctas';

import ImageContents from './register-success/ImageContents';

const RegisterSuccessContainer = styled.div`
  ${tw`relative flex flex-col h-full gap-0.5`}
`;

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 h-full overflow-y-auto`}
`;

export default function RegisterSuccess() {
  const { authType } = useAuthPopup();

  return (
    <>
      <RegisterSuccessContainer>
        <Message type={authType ?? ''} />
        <FlexContents>
          <ImageContents type={authType ?? ''} />
        </FlexContents>
        <Ctas type={authType ?? ''} />
      </RegisterSuccessContainer>
    </>
  );
}
