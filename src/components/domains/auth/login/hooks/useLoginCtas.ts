import { useCallback, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import { loginWithApple } from '@/lib/apple/login';

import { apiService } from '@/services';

import { SocialLoginType } from '@/constants/enums';

import useAuth from '@/hooks/services/useAuth';

import ErrorCodes from '@/constants/error_codes';

interface LoginCustomEventDetail extends NegocioLoginResponseEventPayload {
  error_code: number;
  error_message: string;
  fields: {
    email: string;
    inactive_time: Date;
    social_login_type: number;
  };
}

export default function useLoginCtas({ ipAddress }: { ipAddress?: string }) {
  const { login: handleLogin } = useAuth();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const device = useMemo(() => (platform === 'pc' ? 'MOBILE' : 'PC'), [platform]);

  const handleClickKakaoLogin = useCallback(() => {
    window.open(`${window.location.origin}/auth/kakao`, '_blank');
  }, []);

  const handleClickAppleLogin = useCallback(async () => {
    const res = await loginWithApple();

    if (res && !res.error) {
      const idToken = res.authorization.id_token;

      const detail = await apiService.login({
        browser: navigator.userAgent,
        device,
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

    if (platform === 'pc') {
      // To do Logic
    }

    if (platform === 'mobile') {
      // To do Logic
    }
  }, [device, ipAddress, platform]);

  // 애플 로그인 팝업
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    const handleLoginResponse: EventListenerOrEventListenerObject = async (event) => {
      const detail = (event as CustomEvent).detail as LoginCustomEventDetail;

      if (detail?.access_token && detail?.refresh_token) {
        // await handleLogin(detail.access_token, detail.refresh_token);
        // if (redirect) {
        //   router.replace(redirect);
        // } else {
        //   router.pop();
        // }
      } else if (detail?.new_registration && detail.email && detail.snsToken && detail.socialLoginType) {
        // router.replace(Routes.Register, {
        //   persistParams: true,
        //   searchParams: {
        //     redirect: redirect ?? '',
        //   },
        //   state: {
        //     email: detail.email,
        //     token: detail.snsToken,
        //     socialLoginType: `${detail.socialLoginType}`,
        //     redirect: redirect ?? '',
        //   },
        // });
      } else if (detail?.error_code === ErrorCodes.USER_IS_INACTIVE) {
        // router.push(Routes.Reactivate, {
        //   state: {
        //     email: detail?.fields?.email,
        //     inactive_time: `${detail?.fields?.inactive_time}`,
        //     social_login_type: `${detail?.socialLoginType}`,
        //   },
        // });
      } else {
        toast.error(`문제가 발생했습니다. 잠시 뒤 다시 시도해 주세요. error_code: ${detail?.error_code}`);
      }
    };

    window.addEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);

    return () => {
      window.removeEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);
    };
  }, [router, handleLogin]);

  return { handleClickKakaoLogin, handleClickAppleLogin };
}
