import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import getKakaoAccessToken from '@/apis/internal/getKakaoAccessToken';
import login from '@/apis/user/login';
import { SocialLoginType } from '@/constants/enums';
import Keys from '@/constants/storage_keys';

const Page: NextPage = () => {
  const router = useRouter();

  const handleKakaoLogin = useCallback(async (code: string) => {
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

  useEffect(() => {
    const { code } = router.query;
    if (typeof code === 'string') {
      handleKakaoLogin(code);
    }
  }, [handleKakaoLogin, router]);

  return <div />;
};

export default Page;
