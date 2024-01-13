import { memo, useCallback, useEffect } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { toast } from 'react-toastify';

import { Panel } from '@/components/atoms';

import login from '@/apis/user/login';

import useAuth from '@/hooks/services/useAuth';

import { useRouter } from '@/hooks/utils';

import { loginWithApple } from '@/lib/apple';

import Routes from '@/router/routes';

import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

import { Login as LoginTemplate } from '@/components/templates';

import { SocialLoginType } from '@/constants/enums';

import ErrorCodes from '@/constants/error_codes';

import { isMobile } from '@/utils/is';

interface Props {
  depth: number;
  panelWidth?: string;
  ipAddress?: string;
}

interface LoginCustomEventDetail extends NegocioLoginResponseEventPayload {
  error_code: number;
  error_message: string;
  fields: {
    email: string;
    inactive_time: Date;
    social_login_type: number;
  };
}

export default memo(({ depth, panelWidth, ipAddress }: Props) => {
  const { login: handleLogin } = useAuth();
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

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
    router.replace(Routes.FindAccount);
  }, [router]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    const handleLoginResponse: EventListenerOrEventListenerObject = async (event) => {
      const detail = (event as CustomEvent).detail as LoginCustomEventDetail;

      if (detail?.access_token && detail?.refresh_token) {
        await handleLogin(detail.access_token, detail.refresh_token);
        if (redirect) {
          nextRouter.replace(redirect);
        } else {
          router.pop();
        }
      } else if (detail?.new_registration && detail.email && detail.snsToken && detail.socialLoginType) {
        router.replace(Routes.Register, {
          persistParams: true,
          searchParams: {
            redirect: redirect ?? '',
          },
          state: {
            email: detail.email,
            token: detail.snsToken,
            socialLoginType: `${detail.socialLoginType}`,
            redirect: redirect ?? '',
          },
        });
      } else if (detail?.error_code === ErrorCodes.USER_IS_INACTIVE) {
        router.push(Routes.Reactivate, {
          state: {
            email: detail?.fields?.email,
            inactive_time: `${detail?.fields?.inactive_time}`,
            social_login_type: `${detail?.socialLoginType}`,
          },
        });
      } else {
        toast.error(`문제가 발생했습니다. 잠시 뒤 다시 시도해 주세요. error_code: ${detail?.error_code}`);
      }
    };

    window.addEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);

    return () => {
      window.removeEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);
    };
  }, [router, handleLogin, nextRouter]);

  const handleClickFAQ = useCallback(() => {
    router.replace(Routes.FAQ);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <LoginTemplate
        onClickBack={
          router.query.back === 'true' && router.query.redirect
            ? () => {
                nextRouter.replace(router.query.redirect as string);
              }
            : undefined
        }
        onClickKakaoLogin={handleKakaoLogin}
        onClickAppleLogin={handleAppleLogin}
        onClickForgotMyAccount={handleForgotMyAccount}
        onClickFAQ={handleClickFAQ}
      />
    </Panel>
  );
});
