import { Panel } from '@/components/atoms';
import { NotificationSettings as NotificationSettingsTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.NotificationList);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <NotificationSettingsTemplate onClickBackButton={handleClickBackButton} />
    </Panel>
  );
});
