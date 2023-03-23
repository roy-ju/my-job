import { Panel } from '@/components/atoms';
import { NotificationList as NotificationListTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const handleHeaderItemClick = useCallback(
    (index: number) => {
      if (index === 1) {
        router.replace(Routes.NotificationSettings);
      }
    },
    [router],
  );

  return (
    <Panel width={panelWidth}>
      <NotificationListTemplate onClickHeaderItem={handleHeaderItemClick} />
    </Panel>
  );
});
