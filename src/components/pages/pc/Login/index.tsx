import login from '@/apis/user/login';
import { Panel } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { SocialLoginType } from '@/constants/enums';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import { loginWithApple } from '@/lib/apple';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
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
        browser: '',
        device: '',
        ipAddress: '',
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
  }, []);

  const handleForgotMyAccount = useCallback(() => {
    router.replace(Routes.FindAccount);
  }, [router]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    const handleLoginResponse: EventListenerOrEventListenerObject = async (event) => {
      const detail = (event as CustomEvent).detail as NegocioLoginResponseEventPayload;

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