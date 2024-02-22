import { useCallback, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { Loading, MobileContainer } from '@/components/atoms';

import { MobGlobalNavigation } from '@/components/organisms';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useAuth from '@/hooks/services/useAuth';

import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';

import Routes from '@/router/routes';

import My from '@/components/domains/my/My';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

export default function MyMobile() {
  const router = useRouter();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const { data: dashboardData } = useAPI_GetDashboardInfo();

  const { user, isLoading } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const [tab, setTab] = useState(1);

  const { unreadChatCount } = useSyncronizer();

  const { unreadNotificationCount } = useSyncronizer();

  const handleClickLogin = useCallback(() => {
    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    openAuthPopup('login');
    handleUpdateReturnUrl();
  }, [handleOpenAppInstallPopup, handleUpdateReturnUrl, inAppInfo, openAuthPopup]);

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

  const handleClickFAQ = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.FAQ}`);
  }, [router]);

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

  const handleRequestedSuggests = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRequestedList}?default=1`);
  }, [router]);

  const handleClickMyParticipatingListings = useCallback(
    (params: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.MyParticipatingListings}?tab=${params}&default=1`);
    },
    [router],
  );

  const handleClickMyRegisteredListings = useCallback(
    (params: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.MyRegisteredListingList}?tab=${params}&default=2`);
    },
    [router],
  );

  const handleSuggestRecommendedList = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.SuggestRecommendedList}?default=2`);
  }, [router]);

  const handleTab = useCallback((val: 1 | 2) => {
    setTab(val);
  }, []);

  const handleClickMyRegisteredHomes = useCallback(() => {
    router.push(Routes.MyRegisteredHomes);
  }, [router]);

  const handleDeveloper = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.Developer}`);
  }, [router]);

  useEffect(() => {
    if (router?.query?.default === '1') {
      setTab(1);
      return;
    }

    if (router?.query?.default === '2') {
      setTab(2);
      return;
    }

    setTab(1);
  }, [router?.query?.default]);

  if (!tab)
    return (
      <MobileContainer bottomNav={<MobGlobalNavigation index={4} unreadChatCount={unreadChatCount} />}>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );

  return (
    <>
      <MobileContainer bottomNav={<MobGlobalNavigation index={4} unreadChatCount={unreadChatCount} />}>
        <My
          isLoading={isLoading}
          loggedIn={user !== null}
          name={user?.name}
          nickname={user?.nickname}
          profileImageUrl={user?.profileImageUrl}
          unreadNotificationCount={unreadNotificationCount}
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
          onClickRequestedSuggests={handleRequestedSuggests}
          onClickSuggestRecommendedList={handleSuggestRecommendedList}
          hasAddress={user?.hasAddress}
          hasNotVerifiedAddress={user?.hasNotVerifiedAddress}
          onClickTab={handleTab}
          onClickMyRegisteredHomes={handleClickMyRegisteredHomes}
          onClickDeveloper={process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' ? handleDeveloper : undefined}
          tab={tab}
        />
      </MobileContainer>
    </>
  );
}
