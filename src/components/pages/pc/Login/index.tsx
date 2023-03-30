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

  return (
    <Panel width={panelWidth}>
      <LoginTemplate onClickKakaoLogin={handleKakaoLogin} />
    </Panel>
  );
});
