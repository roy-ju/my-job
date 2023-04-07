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

  const handleClickQna = useCallback(() => {
    router.push(Routes.Qna);
  }, [router]);

  const handleClickMyRealPriceList = useCallback(() => {
    router.push(Routes.MyRealPriceList);
  }, [router]);

  const handleClickTransactionHistory = useCallback(() => {
    router.push(Routes.TransactionHistory);
  }, [router]);

  const handleClickFAQ = useCallback(() => {
    router.push(Routes.FAQ);
  }, [router]);

  const handleClickNegoPoint = useCallback(() => {
    router.push(Routes.NegoPoint);
  }, [router]);

  const handleClickCoupons = useCallback(() => {
    router.push(Routes.MyCoupon);
  }, [router]);

  const handleServiceInfo = useCallback(() => {
    router.push(Routes.ServiceInfo);
  }, [router]);

  const handleCreateListing = useCallback(() => {
    router.push(Routes.ListingCreateAddress);
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
        onClickQna={handleClickQna}
        onClickMyRealPriceList={handleClickMyRealPriceList}
        onClickTransactionHistory={handleClickTransactionHistory}
        onClickFAQ={handleClickFAQ}
        onClickNegoPoint={handleClickNegoPoint}
        onClickCoupons={handleClickCoupons}
        onClickServiceInfo={handleServiceInfo}
        onClickCreateListing={handleCreateListing}
      />
    </Panel>
  );
});
