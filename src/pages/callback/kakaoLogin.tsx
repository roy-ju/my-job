import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import getKakaoAccessToken from '@/apis/internal/getKakaoAccessToken';
import login from '@/apis/user/login';
import { SocialLoginType } from '@/constants/enums';
import Keys from '@/constants/storage_keys';
import updateEmail from '@/apis/user/updateEmail';
import { Popup } from '@/components/molecules';

enum EmailUpdateState {
  Pending,
  Success,
  DuplicatedCI,
  DuplicatedEmail,
}

const Page: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState(EmailUpdateState.Pending);

  const handleLogin = useCallback(async (code: string) => {
    const kakaoAccessTokenResponse = await getKakaoAccessToken({
      code,
      redirectUri: `${window.location.origin}${window.location.pathname}`,
    });

    if (!kakaoAccessTokenResponse) {
      return false;
    }

    const loginResponse = await login({
      browser: '',
      device: '',
      ipAddress: '',
      socialLoginType: SocialLoginType.Kakao,
      token: kakaoAccessTokenResponse.accessToken,
    });

    if (!loginResponse) {
      return false;
    }

    if (loginResponse.access_token) {
      localStorage.setItem(Keys.ACCESS_TOKEN, JSON.stringify(loginResponse.access_token));
      localStorage.setItem(Keys.REFRESH_TOKEN, JSON.stringify(loginResponse.refresh_token));
      window.opener?.Negocio.onLoginSuccess();
      window.close();
    }

    return true;
  }, []);

  const handleEmailUpdate = useCallback(async (code: string) => {
    const kakaoAccessTokenResponse = await getKakaoAccessToken({
      code,
      redirectUri: `${window.location.origin}${window.location.pathname}`,
    });

    console.log(kakaoAccessTokenResponse);

    if (!kakaoAccessTokenResponse) {
      return false;
    }

    const updateEmailRes = await updateEmail(kakaoAccessTokenResponse.accessToken, SocialLoginType.Kakao);

    if (updateEmailRes === null) {
      setState(EmailUpdateState.Success);
    } else if (updateEmailRes.error_code === 1022) {
      setState(EmailUpdateState.DuplicatedCI);
    } else if (updateEmailRes.error_code === 1023) {
      setState(EmailUpdateState.DuplicatedEmail);
    }

    return true;
  }, []);

  useEffect(() => {
    const { code, state: queryState } = router.query;
    if (typeof code === 'string') {
      if (queryState === 'update') {
        handleEmailUpdate(code);
      } else {
        handleLogin(code);
      }
    }
  }, [handleLogin, handleEmailUpdate, router]);

  if (state === EmailUpdateState.Success) {
    return (
      <div tw="h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <Popup>
          <Popup.ContentGroup tw="px-5 py-12 text-center">
            <Popup.Title>변경이 반영되었습니다.</Popup.Title>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => window.close()}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </div>
    );
  }

  if (state === EmailUpdateState.DuplicatedCI) {
    return (
      <div tw="h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <Popup>
          <Popup.ContentGroup>
            <Popup.Title>변경 오류</Popup.Title>
            <Popup.Body>이미 다른 네고시오 계정에서 사용되고 있습니다. 다른 간편로그인 방법을 선택해주세요.</Popup.Body>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => window.close()}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </div>
    );
  }

  if (state === EmailUpdateState.DuplicatedEmail) {
    return (
      <div tw="h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <Popup>
          <Popup.ContentGroup>
            <Popup.Title>간편로그인 방법 변경</Popup.Title>
            <Popup.Body>
              위 로그인 방법은 이미 다른 네고시오 계정에서 사용되고 있습니다.
              <br />
              해당계정을 삭제하고 간편로그인 방법 변경을 계속 진행하시겠습니까?
            </Popup.Body>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.CancelButton onClick={() => window.close()}>취소</Popup.CancelButton>
            <Popup.ActionButton onClick={() => window.close()}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </div>
    );
  }

  return <div />;
};

export default Page;
