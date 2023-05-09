import useAPI_GetUnreadNotificationCount from '@/apis/notification/getUnreadNotificationCount';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { My as MyTemplate } from '@/components/templates';
import { MobileContainer } from '@/components/atoms';
import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import { MobGlobalNavigation } from '@/components/organisms';

export default function MobMy() {
  const router = useRouter();

  const { user, isLoading } = useAuth();
  const { count: unreadNotificationCount } = useAPI_GetUnreadNotificationCount();
  const { data: dashboardData } = useAPI_GetDashboardInfo();

  const handleClickLogin = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.Login}`);
  }, [router]);

  const handleClickNotificationList = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.NotificationList}`);
  }, [router]);

  const handleClickMyDetail = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.MyDetail}`);
  }, [router]);

  const handleClickNoticeList = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.NoticeList}`);
  }, [router]);

  const handleClickQna = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.Qna}`);
  }, [router]);

  const handleClickMyRealPriceList = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.MyRealPriceList}`);
  }, [router]);

  // const handleClickTransactionHistory = useCallback(() => {
  //   router.push(`my/${Routes.TransactionHistory}`);
  // }, [router]);

  const handleClickFAQ = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.FAQ}`);
  }, [router]);

  // const handleClickNegoMoney = useCallback(() => {
  //   router.push(`my/${Routes.NegoMoney}`);
  // }, [router]);

  const handleClickNegoPoint = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.NegoPoint}`);
  }, [router]);

  const handleClickCoupons = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.MyCoupon}`);
  }, [router]);

  const handleServiceInfo = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ServiceInfo}`);
  }, [router]);

  const handleCreateListing = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingCreateAddress}`);
  }, [router]);

  const handleClickMyRegisteredListings = useCallback(
    (params: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.MyRegisteredListingList}?tab=${params}`);
    },
    [router],
  );

  const handleClickMyParticipatingListings = useCallback(
    (params: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.MyParticipatingListings}?tab=${params}`);
    },
    [router],
  );

  const handleReceivedSuggests = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestReceivedList}`);
  }, [router]);

  const handleSuggestRegional = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRegionalForm}`);
  }, [router]);

  const handleRequestedSuggests = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
  }, [router]);

  const handleDeveloper = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.Developer}`);
  }, [router]);

  // return (
  //   <>
  //     <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
  //     <MobMyTemplate
  //       unreadNotificationCount={unreadNotificationCount}
  //       isLoading={isLoading}
  //       loggedIn={user !== null}
  //       nickname={user?.nickname}
  //       onClickLogin={handleClickLogin}
  //       onClickNotificationList={handleClickNotificationList}
  //       onClickMyDetail={handleClickMyDetail}
  //       onClickNoticeList={handleClickNoticeList}
  //       onClickQna={handleClickQna}
  //       onClickMyRealPriceList={handleClickMyRealPriceList}
  //       onClickTransactionHistory={handleClickTransactionHistory}
  //       onClickFAQ={handleClickFAQ}
  //       onClickNegoMoney={handleClickNegoMoney}
  //       onClickNegoPoint={handleClickNegoPoint}
  //       onClickCoupons={handleClickCoupons}
  //       onClickServiceInfo={handleServiceInfo}
  //       onClickCreateListing={handleCreateListing}
  //       onClickDeveloper={handleDeveloper}
  //     />
  //   </>
  // );

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={4} />}>
      <MyTemplate
        unreadNotificationCount={unreadNotificationCount}
        isLoading={isLoading}
        loggedIn={user !== null}
        nickname={user?.nickname}
        dashboardInfo={dashboardData}
        onClickLogin={handleClickLogin}
        onClickNotificationList={handleClickNotificationList}
        onClickMyDetail={handleClickMyDetail}
        onClickNoticeList={handleClickNoticeList}
        onClickQna={handleClickQna}
        onClickMyRealPriceList={handleClickMyRealPriceList}
        onClickFAQ={handleClickFAQ}
        onClickNegoPoint={handleClickNegoPoint}
        onClickCoupons={handleClickCoupons}
        onClickServiceInfo={handleServiceInfo}
        onClickCreateListing={handleCreateListing}
        onClickMyRegisteredListings={handleClickMyRegisteredListings}
        onClickMyParticipatingListings={handleClickMyParticipatingListings}
        onClickSuggestRegional={handleSuggestRegional}
        onClickReceivedSuggests={handleReceivedSuggests}
        onClickRequestedSuggests={handleRequestedSuggests}
        onClickDeveloper={handleDeveloper}
      />
    </MobileContainer>
  );
}
