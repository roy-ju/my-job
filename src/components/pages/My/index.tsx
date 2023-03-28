import useAPI_GetUnreadNotificationCount from '@/apis/notification/getUnreadNotificationCount';
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
  const { count: unreadNotificationCount } = useAPI_GetUnreadNotificationCount();

  const handleClickNotificationList = useCallback(() => {
    router.push(Routes.NotificationList);
  }, [router]);

  const handleClickMyDetail = useCallback(() => {
    router.push(Routes.MyDetail);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <MyTemplate
        unreadNotificationCount={unreadNotificationCount}
        isLoading={isLoading}
        nickname={user?.nickname}
        onClickNotificationList={handleClickNotificationList}
        onClickMyDetail={handleClickMyDetail}
      />
    </Panel>
  );
});
