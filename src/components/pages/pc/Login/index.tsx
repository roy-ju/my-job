import { Panel } from '@/components/atoms';
import { Login as LoginTemplate } from '@/components/templates';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const handleKakaoLogin = useCallback(() => {
    window.open(`${window.location.origin}/auth/kakao`, '_blank');
  }, []);

  return (
    <Panel width={panelWidth}>
      <LoginTemplate onClickKakaoLogin={handleKakaoLogin} />
    </Panel>
  );
});
