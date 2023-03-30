import { Panel } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { memo, useCallback, useEffect } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { user, isLoading } = useAuth();

  const handleKakaoLogin = useCallback(() => {
    window.open(`${window.location.origin}/auth/kakao`, '_blank');
  }, []);

  useEffect(() => {
    if (user && !isLoading) {
      router.pop();
    }
  }, [router, user, isLoading]);

  return (
    <Panel width={panelWidth}>
      <LoginTemplate onClickKakaoLogin={handleKakaoLogin} />
    </Panel>
  );
});
