import { useState, useCallback, useEffect, useRef } from 'react';

import Image from 'next/image';

import LoginImage from '@/../public/static/images/auth/login.png';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useOutsideClick from '@/hooks/useOutsideClick';

import useEtcCtas from './hooks/useEtcCtas';

import useLoginCtas from './hooks/useLoginCtas';

import Ctas from './Ctas';

import {
  bottomSheetVariants,
  itemVariants,
  BottomSheetContainer,
  BottomSheetChild,
  CtasContainer,
  ImageContainer,
  TitleContainer,
} from './LoginPopupAtom';

export default function MobileLoginPopup() {
  const sheetRef = useRef<HTMLDivElement | null>(null);

  const [ipAddress, setIpAddress] = useState('');

  const { closeAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const handleClickCloseButton = useCallback(() => {
    closeAuthPopup();
    handleUpdateReturnUrl('');
  }, [closeAuthPopup, handleUpdateReturnUrl]);

  const { handleClickKakaoLogin, handleClickAppleLogin } = useLoginCtas({ ipAddress });

  const { handleClickForgotPassword } = useEtcCtas();

  useOutsideClick({ ref: sheetRef, handler: () => handleClickCloseButton() });

  useEffect(() => {
    async function fetchIpAddress() {
      const response = await fetch('/api/ip/getIpAddress');
      const data = await response.json();
      setIpAddress(data.ipAddress);
    }

    fetchIpAddress();

    return () => setIpAddress('');
  }, []);

  return (
    <BottomSheetContainer
      variants={bottomSheetVariants}
      key="bottomSheet"
      initial="hidden"
      animate="visible"
      exit="exit"
      ref={sheetRef}
    >
      <BottomSheetChild variants={itemVariants}>
        <TitleContainer tw="pt-0">
          <p>부동산 네고 쉽고 빠르게</p>
          <p>내 인생 가장 큰 거래 부동산, 꼭 네고하세요!</p>
        </TitleContainer>
        <ImageContainer tw="px-0 relative">
          <Image src={LoginImage} width={300} height={200} alt="loginImage" tw="mx-auto" />
        </ImageContainer>
        <CtasContainer tw="pb-0">
          <Ctas
            handleClickKakaoLogin={handleClickKakaoLogin}
            handleClickAppleLogin={handleClickAppleLogin}
            handleClickForgotPassword={handleClickForgotPassword}
          />
        </CtasContainer>
      </BottomSheetChild>
    </BottomSheetContainer>
  );
}
