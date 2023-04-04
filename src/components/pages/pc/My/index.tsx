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

  const handleClickLogin = useCallback(() => {
    router.push(Routes.Login);
  }, [router]);

  const handleClickNotificationList = useCallback(() => {
    router.push(Routes.NotificationList);
  }, [router]);

  const handleClickMyDetail = useCallback(() => {
    router.push(Routes.MyDetail);
  }, [router]);

  const handleClickNoticeList = useCallback(() => {
    router.push(Routes.NoticeList);
  }, [router]);

  const handleClickServiceContact = useCallback(() => {
    router.push(Routes.ServiceContact);
  }, [router]);

  const handleClickMyRealPriceList = useCallback(() => {
    router.push(Routes.MyRealPriceList);
  }, [router]);

  const handleClickNegoPoint = useCallback(() => {
    router.push(Routes.NegoPoint);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      <MyTemplate
        unreadNotificationCount={unreadNotificationCount}
        isLoading={isLoading}
        loggedIn={user !== null}
        nickname={user?.nickname}
        onClickLogin={handleClickLogin}
        onClickNotificationList={handleClickNotificationList}
        onClickMyDetail={handleClickMyDetail}
        onClickNoticeList={handleClickNoticeList}
        onClickServiceContact={handleClickServiceContact}
        onClickMyRealPriceList={handleClickMyRealPriceList}
        onClickNegoPoint={handleClickNegoPoint}
      />
    </Panel>
  );
});
