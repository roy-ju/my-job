import login from '@/apis/user/login';
import { Panel } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { SocialLoginType } from '@/constants/enums';
import Keys from '@/constants/storage_keys';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { loginWithApple } from '@/lib/apple';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
// import { mutate } from 'swr';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { mutate: mutateUser } = useAuth();
  const router = useRouter(depth);

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
    router.replace(Routes.FindAccount);
  }, [router]);

  useEffect(() => {
    window.Negocio.callbacks.loginSuccess = () => {
      console.log('loginSUccess');
      mutateUser(true);
      router.pop();
    };
    window.Negocio.callbacks.newRegister = (email: string, token: string, socialLoginType: number) => {
      router.replace(Routes.Register, { state: { email, token, socialLoginType: `${socialLoginType}` } });
    };
    return () => {
      delete window.Negocio.callbacks.loginSuccess;
      delete window.Negocio.callbacks.newRegister;
    };
  }, [router, mutateUser]);

  return (
    <Panel width={panelWidth}>
      <LoginTemplate
        onClickKakaoLogin={handleKakaoLogin}
        onClickAppleLogin={handleAppleLogin}
        onClickForgotMyAccount={handleForgotMyAccount}
      />
    </Panel>
  );
});
