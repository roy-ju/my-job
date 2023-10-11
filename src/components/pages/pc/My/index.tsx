import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
import { Panel } from '@/components/atoms';
import { My as MyTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import { coordToRegion } from '@/lib/kakao';
import { NaverLatLng } from '@/lib/navermap/types';
import Routes from '@/router/routes';
import useSyncronizer from '@/states/syncronizer';
import { memo, useCallback, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { user, isLoading } = useAuth();
  const { data: dashboardData } = useAPI_GetDashboardInfo();

  const [tab, setTab] = useState(1);

  const { unreadNotificationCount } = useSyncronizer();

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

  const handleMyAddress = useCallback(() => {
    router.push(Routes.MyAddress);
  }, [router]);

  const handleClickMyRegisteredListings = useCallback(
    (params: number) => {
      router.push(Routes.MyRegisteredListingList, {
        searchParams: { tab: `${params}` },
      });
    },
    [router],
  );

  const handleClickMyParticipatingListings = useCallback(
    (params: number) => {
      router.push(Routes.MyParticipatingListings, {
        searchParams: { tab: `${params}` },
      });
    },
    [router],
  );

  const handleRecommendationForm = useCallback(async () => {
    if (!window.NaverMap) {
      router.replace(Routes.RecommendationForm);
      return;
    }
    const center = window.NaverMap.getCenter() as NaverLatLng;
    const response = await coordToRegion(center.x, center.y);
    if (response && response.documents?.length > 0) {
      const region = response.documents.filter((item) => item.region_type === 'B')[0];
      if (region) {
        router.replace(Routes.RecommendationForm, {
          searchParams: {
            address: `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`,
            redirect: `${router.asPath}`,
            back: 'true',
          },
        });
      }
    }
  }, [router]);

  const handleRequestedSuggests = useCallback(() => {
    router.push(Routes.SuggestRequestedList);
  }, [router]);

  const handleSuggestRecommendedList = useCallback(() => {
    router.push(Routes.SuggestRecommendedList);
  }, [router]);

  const handleTab = useCallback((val: 1 | 2) => {
    setTab(val);
  }, []);

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
        onClickRecommendationForm={handleRecommendationForm}
        onClickRequestedSuggests={handleRequestedSuggests}
        onClickSuggestRecommendedList={handleSuggestRecommendedList}
        tab={tab}
        isVerifyHomeOwner={user?.hasAddress}
        isWaitingAgreementHomeOwner
        onClickTab={handleTab}
      />
    </Panel>
  );
});
