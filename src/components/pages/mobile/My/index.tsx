import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { My as MyTemplate } from '@/components/templates';
import { MobileContainer } from '@/components/atoms';
import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import { MobGlobalNavigation } from '@/components/organisms';
import useSyncronizer from '@/states/syncronizer';

export default function MobMy() {
  const router = useRouter();

  const { user, isLoading } = useAuth();
  const { data: dashboardData } = useAPI_GetDashboardInfo();

  const { unreadChatCount } = useSyncronizer();

  const { unreadNotificationCount } = useSyncronizer();

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

  const handleMyAddress = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
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

  const handleRecommendationForm = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.RecommendationForm}`);
  }, [router]);

  const handleRequestedSuggests = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}`);
  }, [router]);

  const handleSuggestRecommendedList = useCallback(() => {
    router.push(Routes.SuggestRecommendedList);
  }, [router]);

  const handleDeveloper = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.Developer}`);
  }, [router]);

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={4} unreadChatCount={unreadChatCount} />}>
      <MyTemplate
        unreadNotificationCount={unreadNotificationCount}
        isLoading={isLoading}
        loggedIn={user !== null}
        nickname={user?.nickname}
        profileImageUrl={user?.profileImageUrl}
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
        onClickMyAddress={handleMyAddress}
        onClickMyRegisteredListings={handleClickMyRegisteredListings}
        onClickMyParticipatingListings={handleClickMyParticipatingListings}
        onClickRecommendationForm={handleRecommendationForm}
        onClickReceivedSuggests={handleReceivedSuggests}
        onClickRequestedSuggests={handleRequestedSuggests}
        onClickSuggestRecommendedList={handleSuggestRecommendedList}
        onClickDeveloper={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? handleDeveloper : undefined}
      />
    </MobileContainer>
  );
}
