import login from '@/apis/user/login';
import { Panel } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { SocialLoginType } from '@/constants/enums';
import Keys from '@/constants/storage_keys';
import { useRouter } from '@/hooks/utils';
import { loginWithApple } from '@/lib/apple';
import { memo, useCallback } from 'react';
import { toast } from 'react-toastify';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleKakaoLogin = useCallback(() => {
    router.pop();
    window.open(`${window.location.origin}/auth/kakao`, '_blank');
  }, [router]);

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

  return (
    <Panel width={panelWidth}>
      <LoginTemplate onClickKakaoLogin={handleKakaoLogin} onClickAppleLogin={handleAppleLogin} />
    </Panel>
  );
});
