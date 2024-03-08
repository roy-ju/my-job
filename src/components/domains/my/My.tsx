import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { NavigationHeader } from '@/components/molecules';

import BellIcon from '@/assets/icons/bell.svg';

import { Loading, Separator } from '@/components/atoms';

import { GetDashboardInfoResponse } from '@/apis/my/getDashboardInfo';

import useAuth from '@/hooks/services/useAuth';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import UserSummary from './my/UserSummary';

import LoginRequired from './my/LoginRequired';

import NavigationList from './my/NavigationList';

import ListingSummary from './my/ListingSummary';

interface MyProps {
  isLoading?: boolean;
  loggedIn?: boolean;
  name?: string;
  nickname?: string;
  profileImageUrl?: string;
  unreadNotificationCount?: number;
  dashboardInfo?: GetDashboardInfoResponse | null;
  tab?: number;
  hasAddress?: boolean;
  hasNotVerifiedAddress?: boolean;
  onClickLogin?: () => void;
  onClickNotificationList?: () => void;
  onClickMyDetail?: () => void;
  onClickNoticeList?: () => void;
  onClickQna?: () => void;
  onClickMyRealPriceList?: () => void;
  onClickFAQ?: () => void;
  onClickServiceInfo?: () => void;
  onClickMyAddress?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
  onClickMyParticipatingListings?: (params: number) => void;
  onClickRequestedSuggests?: () => void;
  onClickSuggestRecommendedList?: () => void;
  onClickDeveloper?: () => void;
  onClickTab?: (val: 1 | 2) => void;
  onClickMyRegisteredHomes?: () => void;
}

export default function My({
  isLoading,
  loggedIn,
  name,
  nickname,
  profileImageUrl,
  unreadNotificationCount = 0,
  dashboardInfo,
  tab,
  hasAddress,
  hasNotVerifiedAddress,
  onClickLogin,
  onClickNotificationList,
  onClickMyDetail,
  onClickNoticeList,
  onClickQna,
  onClickMyRealPriceList,
  onClickFAQ,
  onClickServiceInfo,
  onClickMyAddress,
  onClickMyRegisteredListings,
  onClickMyParticipatingListings,
  onClickRequestedSuggests,
  onClickSuggestRecommendedList,
  onClickDeveloper,
  onClickTab,
  onClickMyRegisteredHomes,
}: MyProps) {
  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickSampleRealestateTradeProcess = useCallback(() => {
    const url =
      platform === 'pc' ? `/${Routes.My}/${Routes.TradeProcess}` : `/${Routes.EntryMobile}/${Routes.TradeProcess}`;

    if (!user && inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      openAuthPopup('onlyLogin');
      handleUpdateReturnUrl(url);
      return;
    }

    router.push(url);
  }, [
    user,
    inAppInfo.isInAppBrowser,
    platform,
    router,
    openAuthPopup,
    handleOpenAppInstallPopup,
    handleUpdateReturnUrl,
  ]);

  const handleClickSampleRealestateDict = useCallback(() => {
    const url =
      platform === 'pc' ? `/${Routes.My}/${Routes.Dictionary}` : `/${Routes.EntryMobile}/${Routes.Dictionary}`;

    if (!user && inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      handleUpdateReturnUrl(url);
      openAuthPopup('login');
      return;
    }

    router.push(url);
  }, [
    user,
    inAppInfo.isInAppBrowser,
    platform,
    router,
    openAuthPopup,
    handleOpenAppInstallPopup,
    handleUpdateReturnUrl,
  ]);

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1 leading-none">마이페이지</NavigationHeader.Title>

        {loggedIn && (
          <NavigationHeader.Button tw="ml-auto" onClick={onClickNotificationList}>
            <div tw="relative">
              <BellIcon />
              {unreadNotificationCount > 0 && (
                <span tw="absolute top-0 -right-0.5  animate-bounce   text-[8px] text-white  font-bold leading-none px-1 h-3 bg-red rounded-full inline-flex items-center justify-center ">
                  {unreadNotificationCount}
                </span>
              )}
            </div>
          </NavigationHeader.Button>
        )}
      </NavigationHeader>

      <div tw="flex-1 min-h-0 overflow-auto pb-10">
        {isLoading ? (
          <div tw="h-40 flex items-center justify-center">
            <Loading />
          </div>
        ) : !loggedIn ? (
          <div tw="mt-5 mb-14">
            <LoginRequired onClickLogin={onClickLogin} />
          </div>
        ) : (
          <>
            <UserSummary
              profileImagePath={profileImageUrl}
              name={name}
              nickname={nickname}
              onClickMyDetail={onClickMyDetail}
            />

            <ListingSummary
              dashboardInfo={dashboardInfo}
              onClickMyAddress={onClickMyAddress}
              onClickMyRegisteredListings={onClickMyRegisteredListings}
              onClickMyParticipatingListings={onClickMyParticipatingListings}
              onClickRequestedSuggests={onClickRequestedSuggests}
              onClickSuggestRecommendedList={onClickSuggestRecommendedList}
              tab={tab}
              hasAddress={hasAddress}
              hasNotVerifiedAddress={hasNotVerifiedAddress}
              onClickTab={onClickTab}
              onClickMyRegisteredHomes={onClickMyRegisteredHomes}
            />
          </>
        )}

        <Separator tw="bg-gray-300 h-2" />

        {loggedIn && <NavigationList.Item title="관심실거래가 현황" onClick={onClickMyRealPriceList} />}

        {loggedIn && <Separator tw="bg-gray-300 h-2" />}

        <NavigationList>
          <NavigationList.Item title="공지사항" onClick={onClickNoticeList} />
          <NavigationList.Item title="자주 묻는 질문" onClick={onClickFAQ} />
          {loggedIn && <NavigationList.Item title="서비스 문의" onClick={onClickQna} />}
          <NavigationList.Item title="서비스 정보" onClick={onClickServiceInfo} />
          {onClickDeveloper && <NavigationList.Item title="개발자 설정" onClick={onClickDeveloper} />}

          <NavigationList.Item title="부동산 거래절차 (sample)" onClick={handleClickSampleRealestateTradeProcess} />
          <NavigationList.Item title="부동산 용어사전 (sample)" onClick={handleClickSampleRealestateDict} />
        </NavigationList>
      </div>
    </div>
  );
}
