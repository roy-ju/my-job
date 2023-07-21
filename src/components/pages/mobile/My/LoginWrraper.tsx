/* eslint-disable consistent-return */
import { loginWithApple } from '@/lib/apple';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { SocialLoginType } from '@/constants/enums';
import login from '@/apis/user/login';
import Routes from '@/router/routes';
import { MobileContainer } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import Events, { NegocioLoginResponseEventPayload } from '@/constants/events';
import { toast } from 'react-toastify';

export default function LoginWrraper() {
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
    router.push(`/${Routes.EntryMobile}/${Routes.FindAccount}`);
  }, [router]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirect = urlSearchParams.get('redirect');

    const handleLoginResponse: EventListenerOrEventListenerObject = async (event) => {
      const detail = (event as CustomEvent).detail as NegocioLoginResponseEventPayload;

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
      } else {
        toast.error(`문제가 발생했습니다. 잠시 뒤 다시 시도해 주세요. error_code: ${detail?.error_code}`);
      }
    };

    window.addEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);

    return () => {
      window.removeEventListener(Events.NEGOCIO_LOGIN_RESPONSE_EVENT, handleLoginResponse);
    };
  }, [router, handleLogin]);

  return (
    <MobileContainer>
      <LoginTemplate
        onClickKakaoLogin={handleKakaoLogin}
        onClickAppleLogin={handleAppleLogin}
        onClickForgotMyAccount={handleForgotMyAccount}
        onClickBack={() => router.back()}
      />
    </MobileContainer>
  );
}