import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import getKakaoAccessToken from '@/apis/internal/getKakaoAccessToken';
import login from '@/apis/user/login';
import { SocialLoginType } from '@/constants/enums';
import updateEmail from '@/apis/user/updateEmail';
import { Button, Loading } from '@/components/atoms';
import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';
import * as gtag from '@/lib/gtag';

const Page: NextPage = () => {
  const router = useRouter();

  const [hasOpener, setHasOpener] = useState(true);

  const handleLogin = useCallback(async (code: string) => {
    // 카카오에서 전달받은 코드로 카카오 엑세스 토큰을 가지고 온다.
    const kakaoAccessTokenResponse = await getKakaoAccessToken({
      code,
      redirectUri: `${window.location.origin}${window.location.pathname}`,
    });

    if (!kakaoAccessTokenResponse) {
      window.close();
      return false;
    }

    const detail = await login({
      browser: '',
      device: '',
      ipAddress: '',
      socialLoginType: SocialLoginType.Kakao,
      token: kakaoAccessTokenResponse.accessToken,
    });

    const payload: NegocioLoginResponseEventPayload = {
      ...detail,
      snsToken: kakaoAccessTokenResponse.accessToken,
      socialLoginType: SocialLoginType.Kakao,
    };

    window.opener?.dispatchEvent(new CustomEvent(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, { detail: payload }));

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

    const detail = await updateEmail(kakaoAccessTokenResponse.accessToken, SocialLoginType.Kakao);

    window.opener?.dispatchEvent(new CustomEvent(Events.NEGOCIO_UPDATE_EMAIL_RESPONSE_EVENT, { detail }));

    return true;
  }, []);

  useEffect(() => {
    const { code, state: queryState } = router.query;

    if (!window.opener) {
      // opener 가 없는경우
      gtag.event({ action: 'login_window_no_opener', category: 'err', label: '', value: '' });
      setHasOpener(false);
    } else if (typeof code === 'string') {
      if (queryState === 'update') {
        handleEmailUpdate(code).then(() => window.close());
      } else {
        handleLogin(code).then(() => window.close());
      }
    }
  }, [handleLogin, handleEmailUpdate, router]);

  return (
    <div tw="w-full h-full flex items-center justify-center">
      {!hasOpener ? (
        <div tw="flex flex-col items-center justify-center">
          <div tw="text-h2 font-medium mb-4 text-center">비정상적인 접근입니다.</div>
          <Button variant="secondary" size="bigger" onClick={() => window.close()}>
            돌아가기
          </Button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
