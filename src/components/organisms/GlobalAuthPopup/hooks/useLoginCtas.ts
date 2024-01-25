import { useCallback, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import { loginWithApple } from '@/lib/apple/login';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import { SocialLoginType } from '@/constants/enums';

import ErrorCodes from '@/constants/error_codes';

import Routes from '@/router/routes';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';
import useReturnUrl from '@/states/hooks/useReturnUrl';

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
  const { login, user } = useAuth();

  const { closeAuthPopup, authType } = useAuthPopup();

  const { returnUrl } = useReturnUrl();

  const { openVerifyCiPopup } = useVerifyCiPopup();

  const { platform } = useCheckPlatform();

  const router = useRouter();

  const device = useMemo(() => (platform === 'pc' ? 'MOBILE' : 'PC'), [platform]);

  const handleClickKakaoLogin = useCallback(() => {
    if (platform === 'pc') {
      const width = 375;

      const height = document.documentElement.scrollHeight;

      const top = (window.innerHeight - height) / 2;

      const left = (window.innerWidth - width) / 2;

      window.open(
        `${window.location.origin}/auth/kakao`,
        '_blank',
        `width=${width}, height=${height}, top=${top}, left=${left}`,
      );
    }

    if (platform === 'mobile') {
      window.open(`${window.location.origin}/auth/kakao`, '_blank');
    }
  }, [platform]);

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
  }, [device, ipAddress]);

  useEffect(() => {
    if (!platform) return;

    if (user && !user.isVerified && authType === 'needVerify') {
      openVerifyCiPopup();
    }

    const handleLoginResponse: EventListenerOrEventListenerObject = async (event) => {
      const detail = (event as CustomEvent).detail as LoginCustomEventDetail;

      if (detail?.access_token && detail?.refresh_token) {
        await login(detail.access_token, detail.refresh_token);
      } else if (detail?.new_registration && detail.email && detail.snsToken && detail.socialLoginType) {
        if (platform === 'pc') {
          const depth1 = router?.query?.depth1;
          const depth2 = router?.query?.depth2;
          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          query.email = detail.email;
          query.token = detail.snsToken;
          query.socialLoginType = `${detail.socialLoginType}`;

          if (depth1 && depth2) {
            router.push({
              pathname: `/${depth1}/${Routes.Register}`,
              query,
            });
          }

          if (depth1 && !depth2) {
            router.push({
              pathname: `${depth1}/${Routes.Register}`,
              query,
            });
          }

          if (!depth1 && !depth2) {
            router.push({
              pathname: `/${Routes.Register}`,
              query,
            });
          }
        }

        if (platform === 'mobile') {
          router.push({
            pathname: `/${Routes.EntryMobile}/${Routes.Register}`,
            query: {
              email: detail.email,
              token: detail.snsToken,
              socialLoginType: `${detail.socialLoginType}`,
            },
          });
        }
      } else if (detail?.error_code === ErrorCodes.USER_IS_INACTIVE) {
        // if (platform === 'pc') {
        //   const depth1 = router?.query?.depth1;
        //   const depth2 = router?.query?.depth2;
        //   const query = router.query;
        //   delete query.depth1;
        //   delete query.depth2;
        //   query.email = detail?.fields?.email;
        //   query.inactive_time = `${detail?.fields?.inactive_time}`;
        //   query.social_login_type = `${detail?.socialLoginType}`;
        //   if (redirect) {
        //     query.redirect = redirect;
        //   }
        //   if (depth1 && depth2) {
        //     router.push({
        //       pathname: `/${depth1}/${Routes.Reactivate}`,
        //       query,
        //     });
        //   }
        //   if (depth1 && !depth2) {
        //     router.push({
        //       pathname: `/${Routes.Reactivate}`,
        //       query,
        //     });
        //   }
        //   if (!depth1 && !depth2) {
        //     router.push({
        //       pathname: `/${Routes.Reactivate}`,
        //       query,
        //     });
        //   }
        // }
        // if (platform === 'mobile') {
        //   router.push({
        //     pathname: `/${Routes.EntryMobile}/${Routes.Reactivate}`,
        //     query: {
        //       email: detail?.fields?.email,
        //       inactive_time: `${detail?.fields?.inactive_time}`,
        //       social_login_type: `${detail?.socialLoginType}`,
        //       ...(redirect ? { redirect } : {}),
        //     },
        //   });
        // }
      } else {
        toast.error(`문제가 발생했습니다. 잠시 뒤 다시 시도해 주세요. error_code: ${detail?.error_code}`);
      }

      closeAuthPopup();
    };

    window.addEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);

    return () => {
      window.removeEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);
    };
  }, [router, login, platform, closeAuthPopup, returnUrl, user, authType, openVerifyCiPopup]);

  return { handleClickKakaoLogin, handleClickAppleLogin };
}
