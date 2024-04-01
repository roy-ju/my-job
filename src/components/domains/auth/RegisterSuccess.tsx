import tw, { styled } from 'twin.macro';

import FlexContents from '@/components/atoms/FlexContents';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useVerifyCiStatus from '@/states/hooks/useVerifyCiStatus';

import Message from './register-success/Message';

import Ctas from './register-success/Ctas';

import ImageContents from './register-success/ImageContents';

import VerifyCiSuccess from './verify-ci/success/VerifyCiSuccess';

const RegisterSuccessContainer = styled.div`
  ${tw`relative flex flex-col h-full gap-0.5`}
`;

export default function RegisterSuccess() {
  const { verifyStatus } = useVerifyCiStatus();

  const { authType } = useAuthPopup();

  if (verifyStatus === 'success') {
    return <VerifyCiSuccess />;
  }

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
