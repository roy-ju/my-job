/* eslint-disable consistent-return */
import { MobLogin } from '@/components/templates';
import { loginWithApple } from '@/lib/apple';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { SocialLoginType } from '@/constants/enums';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import login from '@/apis/user/login';
import Keys from '@/constants/storage_keys';
import Routes from '@/router/routes';

export default function LoginWrraper() {
  const router = useRouter();

  const handleKakaoLogin = useCallback(() => {
    window.open(`${window.location.origin}/auth/kakao`, '_blank');
  }, []);

  const handleAppleLogin = useCallback(async () => {
    const res = await loginWithApple();
    if (res && !res.error) {
      const idToken = res.authorization.id_token;

      const loginResponse = await login({
        browser: '',
        device: '',
        ipAddress: '',
        socialLoginType: SocialLoginType.Apple,
        token: idToken,
      });

      if (loginResponse?.access_token) {
        localStorage.setItem(Keys.ACCESS_TOKEN, JSON.stringify(loginResponse.access_token));
        localStorage.setItem(Keys.REFRESH_TOKEN, JSON.stringify(loginResponse.refresh_token));
        window.Negocio.callbacks.loginSuccess?.();
      } else {
        toast.error('로그인에 실패하였습니다.');
      }
    }
  }, []);

  const handleForgotMyAccount = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.My}/${Routes.FindAccount}`);
  }, [router]);

  useEffect(() => {
    window.Negocio.callbacks.loginSuccess = () => {
      mutate(() => true, undefined);
      router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
    };

    window.Negocio.callbacks.newRegister = (email: string, token: string, socialLoginType: number) => {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.Register}`,
        query: { email, token, socialLoginType: `${socialLoginType}` },
      });
    };

    return () => {
      delete window.Negocio.callbacks.loginSuccess;
      delete window.Negocio.callbacks.newRegister;
    };
  }, [router]);

  return (
    <MobLogin
      onClickKakaoLogin={handleKakaoLogin}
      onClickAppleLogin={handleAppleLogin}
      onClickForgotMyAccount={handleForgotMyAccount}
    />
  );
}
