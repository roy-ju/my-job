import tw, { styled } from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { RegisterSuccessType } from './types';

import useRegisterSuccessCta from './hooks/useRegisterSuccessCta';

type CtasProps = { type: RegisterSuccessType };

const CtasContainer = styled.div`
  ${tw`flex flex-col w-full gap-3 px-5 pb-3`}
`;

const CTAButton = styled(ButtonV2)``;

CTAButton.defaultProps = {
  size: 'bigger',
};

export default function Ctas({ type }: CtasProps) {
  const { handleOnlyLoginCta, handleDirectVerifyCta, handleAfterNeedVerifyCta } = useRegisterSuccessCta();

  if (!type) return null;

  return (
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
            괜찮아요, 나중에 할래요
          </CTAButton>
        </>
      )}
    </CtasContainer>
  );
}
