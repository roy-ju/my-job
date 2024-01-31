import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import LoginImage from '@/../public/static/images/auth/login.png';

import CloseIcon from '@/assets/icons/close_24_2.svg';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useLoginCtas from './hooks/useLoginCtas';

import useEtcCtas from './hooks/useEtcCtas';

import {
  PcLoginPopupContainer,
  ButtonContainer,
  CloseButton,
  TitleContainer,
  ImageContainer,
  CtasContainer,
} from './LoginPopupAtom';

import Ctas from './Ctas';

export default function PcLoginPopup() {
  const [ipAddress, setIpAddress] = useState('');

  const { closeAuthPopup, authType } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const handleClickCloseButton = useCallback(() => {
    closeAuthPopup();
    handleUpdateReturnUrl('');
  }, [closeAuthPopup, handleUpdateReturnUrl]);

  const { handleClickKakaoLogin, handleClickAppleLogin } = useLoginCtas({ ipAddress });

  const { handleClickForgotPassword } = useEtcCtas();

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
    <PcLoginPopupContainer>
      <ButtonContainer tw="text-right h-14 p-4">
        <CloseButton onClick={handleClickCloseButton}>
          <CloseIcon />
        </CloseButton>
      </ButtonContainer>
      <TitleContainer>
        {authType === 'login' && <p>부동산 네고 쉽고 빠르게</p>}
        {authType === 'onlyLogin' && <p>로그인이 필요한 서비스입니다.</p>}
        {authType === 'needVerify' && <p>로그인이 필요한 서비스입니다.</p>}
        <p>내 인생 가장 큰 거래 부동산, 꼭 네고하세요!</p>
      </TitleContainer>
      <ImageContainer>
        <Image src={LoginImage} width={300} height={200} alt="loginImage" />
      </ImageContainer>
      <CtasContainer>
        <Ctas
          handleClickKakaoLogin={handleClickKakaoLogin}
          handleClickAppleLogin={handleClickAppleLogin}
          handleClickForgotPassword={handleClickForgotPassword}
        />
      </CtasContainer>
    </PcLoginPopupContainer>
  );
}
