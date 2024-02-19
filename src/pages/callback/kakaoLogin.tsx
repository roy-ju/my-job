import { useCallback, useEffect, useState } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Button, Loading } from '@/components/atoms';

// import useCheckPlatform from '@/hooks/useCheckPlatform';

// import useIsNativeApp from '@/hooks/useIsNativeApp';

import getKakaoAccessToken from '@/apis/internal/getKakaoAccessToken';

import { SocialLoginType } from '@/constants/enums';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import { apiService } from '@/services';

import { isMobile } from '@/utils/is';

// import useKakaoLoginCallbackHandler from '@/hooks/useKakaoLoginCallbackHandler';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const forwarded = context.req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

  return {
    props: {
      ipAddress: ip ?? null,
    },
  };
};

const Page: NextPage = ({ ipAddress }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  // const { platform } = useCheckPlatform();

  // const isNativeApp = useIsNativeApp();

  const [hasOpener, setHasOpener] = useState(true);

  // const { handleLoginPcOrNativeApp, handleEmailUpdatePcOrNativeApp } = useKakaoLoginCallbackHandler({ ipAddress });

  const handleLogin = useCallback(
    async (code: string) => {
      const kakaoAccessTokenResponse = await getKakaoAccessToken({
        code,
        redirectUri: `${window.location.origin}${window.location.pathname}`,
      });

      if (!kakaoAccessTokenResponse) {
        window.close();
        return false;
      }

      const detail = await apiService.login({
        browser: navigator.userAgent,
        device: isMobile(navigator.userAgent) ? 'MOBILE' : 'PC',
        ipAddress: ipAddress ?? null,
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
    },
    [ipAddress],
  );

  const handleEmailUpdate = useCallback(async (code: string) => {
    const kakaoAccessTokenResponse = await getKakaoAccessToken({
      code,
      redirectUri: `${window.location.origin}${window.location.pathname}`,
    });

    if (!kakaoAccessTokenResponse) {
      window.close();
      return false;
    }

    const detail = await apiService.updateEmail(kakaoAccessTokenResponse.accessToken, SocialLoginType.Kakao);

    window.opener?.dispatchEvent(new CustomEvent(Events.NEGOCIO_UPDATE_EMAIL_RESPONSE_EVENT, { detail }));

    return true;
  }, []);

  useEffect(() => {
    const { code, state: queryState } = router.query;

    if (!code) {
      setHasOpener(false);
    } else if (typeof code === 'string') {
      if (queryState === 'update') {
        handleEmailUpdate(code).then(() => window.close());
      } else {
        alert('render');

        handleLogin(code).then(() => window.close());
      }
    }
  }, [handleLogin, handleEmailUpdate, router]);

  // useEffect(() => {
  //   const { code, state: queryState } = router.query;

  //   if (!code) {
  //     setHasOpener(false);
  //   } else if (typeof code === 'string') {
  //     if (isNativeApp || platform === 'pc') {
  //       if (queryState === 'update') {
  //         handleEmailUpdatePcOrNativeApp(code).then(() => {
  //           window.close();
  //         });
  //       } else {
  //         handleLoginPcOrNativeApp(code).then(() => {
  //           window.close();
  //         });
  //       }
  //     } else if (platform === 'mobile') {
  //       if (queryState === 'update') {
  //         alert('모바일');
  //       } else {
  //         alert('모바일');
  //       }
  //     }
  //   }
  // }, [router, isNativeApp, platform, handleEmailUpdatePcOrNativeApp, handleLoginPcOrNativeApp]);

  if (!hasOpener) {
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <div tw="flex flex-col items-center justify-center">
        <div tw="text-h2 font-medium mb-4 text-center">비정상적인 접근입니다.</div>
        <Button variant="secondary" size="bigger" onClick={() => window.close()}>
          돌아가기
        </Button>
      </div>
    </div>;
  }

  return (
    <div tw="w-full h-full flex items-center justify-center bg-white">
      <Loading />
    </div>
  );
};

export default Page;
