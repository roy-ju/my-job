import React from 'react';
import { NavigationHeader } from '@/components/molecules';
import BellIcon from '@/assets/icons/bell.svg';
import { LoginRequired, MyListingsSummary, MyPageNavigationList, MySummary } from '@/components/organisms';
import { Loading, Separator } from '@/components/atoms';
import { GetDashboardInfoResponse } from '@/apis/my/getDashboardInfo';

interface Props {
  isLoading?: boolean;
  loggedIn?: boolean;
  nickname?: string;
  profileImageUrl?: string;
  unreadNotificationCount?: number;
  dashboardInfo?: GetDashboardInfoResponse | null;
  onClickLogin?: () => void;
  onClickNotificationList?: () => void;
  onClickMyDetail?: () => void;
  onClickNoticeList?: () => void;
  onClickQna?: () => void;
  onClickMyRealPriceList?: () => void;
  onClickFAQ?: () => void;
  onClickNegoPoint?: () => void;
  onClickCoupons?: () => void;
  onClickServiceInfo?: () => void;
  onClickMyAddress?: () => void;
  onClickMyRegisteredListings?: (params: number) => void;
  onClickMyParticipatingListings?: (params: number) => void;
  onClickRecommendationForm?: () => void;
  onClickReceivedSuggests?: () => void;
  onClickRequestedSuggests?: () => void;
  onClickSuggestRecommendedList?: () => void;
  onClickDeveloper?: () => void;
}

export default function My({
  isLoading,
  loggedIn,
  nickname,
  profileImageUrl,
  unreadNotificationCount = 0,
  dashboardInfo,
  onClickLogin,
  onClickNotificationList,
  onClickMyDetail,
  onClickNoticeList,
  onClickQna,
  onClickMyRealPriceList,
  onClickFAQ,
  onClickCoupons,
  onClickNegoPoint,
  onClickServiceInfo,
  onClickMyAddress,
  onClickMyRegisteredListings,
  onClickMyParticipatingListings,
  onClickRecommendationForm,
  onClickReceivedSuggests,
  onClickRequestedSuggests,
  onClickSuggestRecommendedList,
  onClickDeveloper,
}: Props) {
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
        {isLoading && (
          <div tw="h-40 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {!isLoading && loggedIn && (
          <>
            <MySummary
              profileImagePath={profileImageUrl}
              nickname={nickname}
              onClickMyDetail={onClickMyDetail}
              onClickCoupons={onClickCoupons}
              onClickNegoPoint={onClickNegoPoint}
            />
            <MyListingsSummary
              dashboardInfo={dashboardInfo}
              onClickMyAddress={onClickMyAddress}
              onClickMyRegisteredListings={onClickMyRegisteredListings}
              onClickMyParticipatingListings={onClickMyParticipatingListings}
              onClickRecommendationForm={onClickRecommendationForm}
              onClickReceivedSuggests={onClickReceivedSuggests}
              onClickRequestedSuggests={onClickRequestedSuggests}
              onClickSuggestRecommendedList={onClickSuggestRecommendedList}
            />
          </>
        )}
        {!isLoading && !loggedIn && (
          <div tw="mt-5 mb-14">
            <LoginRequired onClickLogin={onClickLogin} />
          </div>
        )}
        <Separator tw="bg-gray-300" />

        <MyPageNavigationList>
          {loggedIn && <MyPageNavigationList.Item title="관심실거래가 현황" onClick={onClickMyRealPriceList} />}
          <MyPageNavigationList.Item title="공지사항" onClick={onClickNoticeList} />
          <MyPageNavigationList.Item title="자주 묻는 질문" onClick={onClickFAQ} />
          {loggedIn && <MyPageNavigationList.Item title="서비스 문의" onClick={onClickQna} />}
          <MyPageNavigationList.Item title="서비스 정보" onClick={onClickServiceInfo} />
          {onClickDeveloper && <MyPageNavigationList.Item title="개발자 설정" onClick={onClickDeveloper} />}
        </MyPageNavigationList>
      </div>
    </div>
  );
}
