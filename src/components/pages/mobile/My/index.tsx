import useAPI_GetUnreadNotificationCount from '@/apis/notification/getUnreadNotificationCount';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { MobMy as MobMyTemplate } from '@/components/templates';

export default function MobMy() {
  const router = useRouter();

  const { user, isLoading } = useAuth();
  const { count: unreadNotificationCount } = useAPI_GetUnreadNotificationCount();

  const handleClickLogin = useCallback(() => {
    router.push(`my/${Routes.Login}`);
  }, [router]);

  const handleClickNotificationList = useCallback(() => {
    router.push(`my/${Routes.NotificationList}`);
  }, [router]);

  const handleClickMyDetail = useCallback(() => {
    router.push(`my/${Routes.MyDetail}`);
  }, [router]);

  const handleClickNoticeList = useCallback(() => {
    router.push(`my/${Routes.NoticeList}`);
  }, [router]);

  const handleClickQna = useCallback(() => {
    router.push(`my/${Routes.Qna}`);
  }, [router]);

  const handleClickMyRealPriceList = useCallback(() => {
    router.push(`my/${Routes.MyRealPriceListMobile}`);
  }, [router]);

  const handleClickTransactionHistory = useCallback(() => {
    router.push(`my/${Routes.TransactionHistory}`);
  }, [router]);

  const handleClickFAQ = useCallback(() => {
    router.push(`my/${Routes.FAQ}`);
  }, [router]);

  const handleClickNegoPoint = useCallback(() => {
    router.push(`my/${Routes.NegoPoint}`);
  }, [router]);

  const handleClickCoupons = useCallback(() => {
    router.push(`my/${Routes.MyCoupon}`);
  }, [router]);

  const handleServiceInfo = useCallback(() => {
    router.push(`my/${Routes.ServiceInfo}`);
  }, [router]);

  const handleCreateListing = useCallback(() => {
    router.push(`my/${Routes.ListingCreateAddress}`);
  }, [router]);

  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      <MobMyTemplate
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
    </>
  );
}
