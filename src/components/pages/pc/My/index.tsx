import { memo, useCallback, useEffect, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { Loading, Panel } from '@/components/atoms';

import { My as MyTemplate } from '@/components/templates';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useAuth from '@/hooks/services/useAuth';

import { useRouter } from '@/hooks/utils';

import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const nextRouter = useNextRouter();

  const { user, isLoading } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { data: dashboardData } = useAPI_GetDashboardInfo();

  const [tab, setTab] = useState<number>();

  const { unreadNotificationCount } = useSyncronizer();

  const handleClickLogin = useCallback(() => {
    openAuthPopup('login');
    handleUpdateReturnUrl();
  }, [openAuthPopup, handleUpdateReturnUrl]);

  const handleTab = useCallback((val: 1 | 2) => {
    setTab(val);
  }, []);

  const handleClickNotificationList = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.NotificationList}`);
  }, [nextRouter]);

  const handleClickMyDetail = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.MyDetail}`);
  }, [nextRouter]);

  const handleClickNoticeList = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.NoticeList}`);
  }, [nextRouter]);

  const handleClickQna = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.Qna}`);
  }, [nextRouter]);

  const handleClickMyRealPriceList = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.MyRealPriceList}`);
  }, [nextRouter]);

  const handleClickFAQ = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.FAQ}`);
  }, [nextRouter]);

  const handleClickNegoPoint = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.NegoPoint}`);
  }, [nextRouter]);

  const handleClickCoupons = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.MyCoupon}`);
  }, [nextRouter]);

  const handleServiceInfo = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.ServiceInfo}`);
  }, [nextRouter]);

  const handleMyAddress = useCallback(() => {
    nextRouter.push({ pathname: `/${Routes.My}/${Routes.MyAddress}`, query: { origin: nextRouter.asPath } });
  }, [nextRouter]);

  const handleClickMyRegisteredListings = useCallback(
    (params: number) => {
      nextRouter.push(`/${Routes.My}/${Routes.MyRegisteredListingList}?tab=${params}`);
    },
    [nextRouter],
  );

  const handleClickMyParticipatingListings = useCallback(
    (params: number) => {
      nextRouter.push(`/${Routes.My}/${Routes.MyParticipatingListings}?tab=${params}`);
    },
    [nextRouter],
  );

  const handleRequestedSuggests = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.SuggestRequestedList}`);
  }, [nextRouter]);

  const handleSuggestRecommendedList = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.SuggestRecommendedList}`);
  }, [nextRouter]);

  const handleClickMyRegisteredHomes = useCallback(() => {
    nextRouter.push(`/${Routes.My}/${Routes.MyRegisteredHomes}`);
  }, [nextRouter]);

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
      <Panel>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );

  return (
    <Panel width={panelWidth}>
      <MyTemplate
        isLoading={isLoading}
        loggedIn={user !== null}
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
        tab={tab}
        hasAddress={user?.hasAddress}
        hasNotVerifiedAddress={user?.hasNotVerifiedAddress}
        onClickTab={handleTab}
        onClickMyRegisteredHomes={handleClickMyRegisteredHomes}
      />
    </Panel>
  );
});
