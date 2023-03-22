import { Panel } from '@/components/atoms';
import { My as MyTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { user, isLoading } = useAuth();

  const handleClickNotificationList = useCallback(() => {
    router.push(Routes.NotificationList);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <MyTemplate
        isLoading={isLoading}
        nickname={user?.nickname}
        onClickNotificationList={handleClickNotificationList}
      />
    </Panel>
  );
});
