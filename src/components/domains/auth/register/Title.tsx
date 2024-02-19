import { useCallback } from 'react';

import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import RasingHand from '@/../public/static/images/auth/Raising_Hands_Light_Skin_Tone.png';

import REGISTER_STEP from './constants/registerStep';

type TitleProps = { step: number };

const TitleWrrpaer = styled.div`
  ${tw`flex flex-col gap-1 px-5 pb-5`}
`;

export default function Title({ step }: TitleProps) {
  const renderTitle = useCallback((v: number) => {
    if (v === REGISTER_STEP.NAME || v === REGISTER_STEP.PHONE) {
      return (
        <>
          <p tw="text-heading_01">고객 정보</p>
          <p tw="text-gray-700 text-body_01">공정한 거래를 위하여 고객님의 이름과 전화번호를 입력해주세요.</p>
        </>
      );
    }

    if (v === REGISTER_STEP.TERMS) {
      return (
        <>
          <Image src={RasingHand.src} width={40} height={40} alt="raisingHand" />
          <p tw="text-heading_03 mt-3">
            환영합니다!
            <br />
            네고시오의 서비스 이용을 위해
            <br />
            약관 동의가 필요해요.
          </p>
        </>
      );
    }
    return null;
  }, []);

  if (step === REGISTER_STEP.NONE) {
    return null;
  }

  return <TitleWrrpaer>{renderTitle(step)}</TitleWrrpaer>;
}
