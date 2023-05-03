import useAPI_GetDashboardInfo from '@/apis/my/getDashboardInfo';
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
  const { data: dashboardData } = useAPI_GetDashboardInfo();

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

  const handleCreateListing = useCallback(() => {
    router.push(Routes.ListingCreateAddress);
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

  const handleSuggestRegional = useCallback(() => {
    router.push(Routes.SuggestRegionalForm);
  }, [router]);

  const handleReceivedSuggests = useCallback(() => {
    router.push(Routes.SuggestReceivedList);
  }, [router]);

  const handleRequestedSuggests = useCallback(() => {
    router.push(Routes.SuggestRequestedList);
  }, [router]);

  return (
    <Panel width={panelWidth}>
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
      />
    </Panel>
  );
});
