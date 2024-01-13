/* eslint-disable consistent-return */
import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { MobileContainer } from '@/components/atoms';

import { Login as LoginTemplate } from '@/components/templates';

import useAuth from '@/hooks/services/useAuth';

import { loginWithApple } from '@/lib/apple';

import Routes from '@/router/routes';

import login from '@/apis/user/login';

import { SocialLoginType } from '@/constants/enums';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import ErrorCodes from '@/constants/error_codes';

import { isMobile } from '@/utils/is';

interface LoginCustomEventDetail extends NegocioLoginResponseEventPayload {
  error_code: number;
  error_message: string;
  fields: {
    email: string;
    inactive_time: Date;
    social_login_type: number;
  };
}

export default function LoginWrraper({ ipAddress }: { ipAddress: string }) {
  const { login: handleLogin } = useAuth();

  const router = useRouter();

  const handleKakaoLogin = useCallback(() => {
    window.open(`${window.location.origin}/auth/kakao`, '_blank');
  }, []);

  const handleAppleLogin = useCallback(async () => {
    const res = await loginWithApple();
    if (res && !res.error) {
      const idToken = res.authorization.id_token;

      const detail = await login({
        browser: navigator.userAgent,
        device: isMobile(navigator.userAgent) ? 'MOBILE' : 'PC',
        ipAddress,
        socialLoginType: SocialLoginType.Apple,
        token: idToken,
      });

      const payload: NegocioLoginResponseEventPayload = {
        ...detail,
        snsToken: idToken,
        socialLoginType: SocialLoginType.Apple,
      };

      window.dispatchEvent(new CustomEvent(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, { detail: payload }));
    }
  }, [ipAddress]);

  const handleForgotMyAccount = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.FindAccount}`);
  }, [router]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    const handleLoginResponse: EventListenerOrEventListenerObject = async (event) => {
      const detail = (event as CustomEvent).detail as LoginCustomEventDetail;

      if (detail?.access_token && detail?.refresh_token) {
        await handleLogin(detail.access_token, detail.refresh_token);
        if (redirect) {
          router.replace(redirect);
        } else {
          router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
        }
      } else if (detail?.new_registration && detail.email && detail.snsToken && detail.socialLoginType) {
        router.replace({
          pathname: `/${Routes.EntryMobile}/${Routes.Register}`,
          query: {
            email: detail.email,
            token: detail.snsToken,
            socialLoginType: `${detail.socialLoginType}`,
            redirect: redirect ?? '',
          },
        });
      } else if (detail?.error_code === ErrorCodes.USER_IS_INACTIVE) {
        router.push(
          {
            pathname: `/${Routes.EntryMobile}/${Routes.Reactivate}}`,
            query: {
              email: detail?.fields?.email,
              inactive_time: `${detail?.fields?.inactive_time}`,
              social_login_type: `${detail?.socialLoginType}`,
            },
          },
          `/${Routes.EntryMobile}/${Routes.Reactivate}`,
        );
      } else {
        toast.error(`문제가 발생했습니다. 잠시 뒤 다시 시도해 주세요. error_code: ${detail?.error_code}`);
      }
    };

    window.addEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);

    return () => {
      window.removeEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);
    };
  }, [router, handleLogin]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <MobileContainer>
      <LoginTemplate
        onClickKakaoLogin={handleKakaoLogin}
        onClickAppleLogin={handleAppleLogin}
        onClickForgotMyAccount={handleForgotMyAccount}
        onClickBack={handleClickBack}
      />
    </MobileContainer>
  );
}
