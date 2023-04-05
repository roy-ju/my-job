import { Panel } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

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

  const handleAppleLogin = useCallback(() => {
    router.pop();
    window.open(`${window.location.origin}/auth/apple`, '_blank');

    // window.AppleID.auth.init({
    //   clientId: 'kr.co.negocio.service',
    //   scope: 'email name',
    //   redirectURI: `${window.location.origin}/callback/appleLogin`,
    //   state: '',
    //   usePopup: false,
    // });
    // window.AppleID.auth.signIn();
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <LoginTemplate onClickKakaoLogin={handleKakaoLogin} onClickAppleLogin={handleAppleLogin} />
    </Panel>
  );
});
