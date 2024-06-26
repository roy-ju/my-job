import { NavigationHeader } from '@/components/molecules';

import { Loading, Separator } from '@/components/atoms';

import HeaderNotificationButton from '@/components/organisms/global/HeaderNotificationButton';

import { DashboardInfoResponse } from '@/services/my/types';

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
  dashboardInfo?: DashboardInfoResponse | null;
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
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>마이페이지</NavigationHeader.Title>
        {loggedIn && (
          <HeaderNotificationButton
            unreadNotificationCount={unreadNotificationCount}
            handleClick={onClickNotificationList}
          />
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
        </NavigationList>
      </div>
    </div>
  );
}
