import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import ErrorCodes from '@/constants/error_codes';

import MyUpdatePhone from '@/components/domains/my/MyUpdatePhone';

import useMyUpdatePhone from '@/components/domains/my/my-update-phone/hooks/useMyUpdatePhone';

import useAuth from '@/hooks/services/useAuth';

export default function UpdatePhoneMobile() {
  const router = useRouter();

  const { mutate } = useAuth();

  const {
    phone,
    code,
    sent,
    codeVerified,
    errorCode,
    leftVerificationMinutes,
    leftVerificationSeconds,
    errorMessage,
    handleChangePhone,
    handleChangeCode,
    handleClickSend,
    handleClickVerifyCode,
    handleClickRemovePhoneValue,
  } = useMyUpdatePhone();

  const handleClickNext = useCallback(async () => {
    if (router.query.trigger === 'iPin') {
      // To Will Logic
    } else {
      await mutate();
      router.back();
    }
  }, [mutate, router]);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  if (errorCode === ErrorCodes.MAX_SMS_ATTEMPS_REACHED) {
    return (
      <MobileContainer>
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-10">
              <Popup.Title>인증번호 발송 불가</Popup.Title>
              <Popup.Body>
                하루 최대 인증번호 발송 한도를 초과했습니다.
                <br />
                내일 다시 시도해 주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => router.back()}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <MyUpdatePhone
        minutes={leftVerificationMinutes}
        seconds={leftVerificationSeconds}
        phone={phone}
        code={code}
        sent={sent}
        codeErrorMessage={errorMessage}
        codeVerified={codeVerified}
        onChangePhone={handleChangePhone}
        onChangeCode={handleChangeCode}
        onClickSend={handleClickSend}
        onClickVerifyCode={handleClickVerifyCode}
        onClickNext={handleClickNext}
        onClickBack={handleClickBack}
        onClickRemovePhoneValue={handleClickRemovePhoneValue}
      />
    </MobileContainer>
  );
}
