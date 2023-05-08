import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import getKakaoAccessToken from '@/apis/internal/getKakaoAccessToken';
import login from '@/apis/user/login';
import { SocialLoginType } from '@/constants/enums';
import updateEmail from '@/apis/user/updateEmail';

const Page: NextPage = () => {
  const router = useRouter();

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
      window.opener?.Negocio.callbacks?.loginSuccess?.(loginResponse.access_token, loginResponse.refresh_token);
    } else if (loginResponse.new_registration) {
      window.opener?.Negocio.callbacks?.newRegister?.(
        loginResponse.email,
        kakaoAccessTokenResponse.accessToken,
        SocialLoginType.Kakao,
      );
    }

    window.close();

    return true;
  }, []);

  const handleEmailUpdate = useCallback(async (code: string) => {
    const kakaoAccessTokenResponse = await getKakaoAccessToken({
      code,
      redirectUri: `${window.location.origin}${window.location.pathname}`,
    });

    if (!kakaoAccessTokenResponse) {
      return false;
    }

    const updateEmailRes = await updateEmail(kakaoAccessTokenResponse.accessToken, SocialLoginType.Kakao);
    window.opener?.Negocio?.callbacks?.updateToKakao?.(updateEmailRes);
    window.close();

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

  return <div />;
};

export default Page;
