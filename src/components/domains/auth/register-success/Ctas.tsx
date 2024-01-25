import tw, { styled } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { RegisterSuccessType } from './types';

import useRegisterSuccessCta from './hooks/useRegisterSuccessCta';

import SuggestAfterVerify from './popups/SuggestAfterVerify';

import NotSuggestAfterVerify from './popups/NotSuggestAfterVerify';

type CtasProps = { type: RegisterSuccessType };

const CtasContainer = styled.div`
  ${tw`flex flex-col w-full gap-3 px-5 pb-3`}
`;

const CTAButton = styled(ButtonV2)``;

CTAButton.defaultProps = {
  size: 'bigger',
};

export default function Ctas({ type }: CtasProps) {
  const { popups, closePopup, handleOnlyLoginCta, handleDirectVerifyCta, handleAfterNeedVerifyCta, handleGoHome } =
    useRegisterSuccessCta();

  if (!type) return null;

  return (
    <>
      <CtasContainer css={[type === 'onlyLogin' ? tw`[margin-top: 115px]` : tw`[margin-top: 0px]`]}>
        {type === 'onlyLogin' && (
          <CTAButton tw="w-full" onClick={handleOnlyLoginCta}>
            확인
          </CTAButton>
        )}

        {type === 'needVerify' && (
          <>
            <CTAButton tw="w-full" onClick={handleDirectVerifyCta}>
              좋아요, 본인 인증하기
            </CTAButton>
            <CTAButton variant="primaryOutline" tw="w-full" onClick={handleAfterNeedVerifyCta}>
              아쉽지만, 지금 안할래요
            </CTAButton>
          </>
        )}
      </CtasContainer>
      {popups === 'suggestAfterVerify' && <SuggestAfterVerify handleCancel={closePopup} handleConfirm={handleGoHome} />}

      {popups === 'notSuggestAfterVerify' && (
        <NotSuggestAfterVerify handleCancel={closePopup} handleConfirm={handleGoHome} />
      )}
    </>
  );
}
