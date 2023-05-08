import login from '@/apis/user/login';
import { Panel } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { SocialLoginType } from '@/constants/enums';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { loginWithApple } from '@/lib/apple';
import Routes from '@/router/routes';
import { memo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { login: handleLogin } = useAuth();
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
        window.Negocio.callbacks.loginSuccess?.(loginResponse.access_token, loginResponse.refresh_token);
      } else if (loginResponse?.new_registration) {
        window.Negocio.callbacks.newRegister?.(loginResponse?.email, idToken, SocialLoginType.Apple);
      } else {
        toast.error('로그인에 실패하였습니다.');
      }
    }
  }, []);

  const handleForgotMyAccount = useCallback(() => {
    router.replace(Routes.FindAccount);
  }, [router]);

  useEffect(() => {
    window.Negocio.callbacks.loginSuccess = async (accessToken: string, refreshToken: string) => {
      await handleLogin(accessToken, refreshToken);
      router.pop();
    };
    window.Negocio.callbacks.newRegister = (email: string, token: string, socialLoginType: number) => {
      router.replace(Routes.Register, { state: { email, token, socialLoginType: `${socialLoginType}` } });
    };
    return () => {
      delete window.Negocio.callbacks.loginSuccess;
      delete window.Negocio.callbacks.newRegister;
    };
  }, [router, handleLogin]);

  const handleClickFAQ = useCallback(() => {
    router.replace(Routes.FAQ);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <LoginTemplate
        onClickKakaoLogin={handleKakaoLogin}
        onClickAppleLogin={handleAppleLogin}
        onClickForgotMyAccount={handleForgotMyAccount}
        onClickFAQ={handleClickFAQ}
      />
    </Panel>
  );
});
