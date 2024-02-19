import tw, { styled } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

import { RegisterSuccessType } from './types';

import useRegisterSuccessCta from './hooks/useRegisterSuccessCta';

import AfterVerify from './popups/AfterVerify';

type CtasProps = { type: RegisterSuccessType };

const CtasContainer = styled.div`
  ${tw`flex flex-col w-full gap-3 px-5 pb-3`}
`;

const CTAButton = styled(ButtonV2)``;

CTAButton.defaultProps = {
  size: 'bigger',
};

export default function Ctas({ type }: CtasProps) {
  const {
    popups,
    closePopup,
    handleLoginCta,
    handleOnlyLoginCta,
    handleDirectVerifyCta,
    handleAfterNeedVerifyCta,
    handleGoHome,
  } = useRegisterSuccessCta();

  if (!type) return null;

  return (
    <>
      <CtasContainer css={[type === 'onlyLogin' || type === 'login' ? tw`[margin-top: 0px]` : tw`[margin-top: 0px]`]}>
        {type === 'login' && (
          <CTAButton tw="w-full" onClick={handleLoginCta}>
            확인
          </CTAButton>
        )}
        {type === 'onlyLogin' && (
          <CTAButton tw="w-full" onClick={handleOnlyLoginCta}>
            확인
          </CTAButton>
        )}
        {type === 'needVerify' && (
          <>
            <CTAButton tw="w-full" onClick={handleDirectVerifyCta} id={GOOGLE_TAG_BUTTON_ID.VERIFY_DIRECTLY_CTA}>
              좋아요, 본인 인증하기
            </CTAButton>
            <CTAButton
              variant="primaryOutline"
              tw="w-full"
              onClick={handleAfterNeedVerifyCta}
              id={GOOGLE_TAG_BUTTON_ID.VERIFY_AFTER_CTA}
            >
              아쉽지만, 지금 안할래요
            </CTAButton>
          </>
        )}
      </CtasContainer>

      {popups === 'afterVerify' && <AfterVerify handleCancel={closePopup} handleConfirm={handleGoHome} />}
    </>
  );
}
