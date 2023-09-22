import React from 'react';
import { NavigationHeader } from '@/components/molecules';
import BellIcon from '@/assets/icons/bell.svg';
import {
  LoginRequired,
  MobGlobalNavigation,
  MobMySummary,
  MyListingsSummary,
  MyPageNavigationList,
} from '@/components/organisms';
import { Loading, Separator } from '@/components/atoms';
import defaultAvatar from '@/../public/static/images/default_avatar.png';

interface Props {
  isLoading?: boolean;
  loggedIn?: boolean;
  nickname?: string;
  unreadNotificationCount?: number;
  onClickLogin?: () => void;
  onClickNotificationList?: () => void;
  onClickMyDetail?: () => void;
  onClickNoticeList?: () => void;
  onClickQna?: () => void;
  onClickMyRealPriceList?: () => void;
  onClickTransactionHistory?: () => void;
  onClickFAQ?: () => void;
  onClickNegoMoney?: () => void;
  onClickNegoPoint?: () => void;
  onClickCoupons?: () => void;
  onClickServiceInfo?: () => void;
  onClickMyAddress?: () => void;
  onClickDeveloper?: () => void;
}

export default function MobMy({
  isLoading,
  loggedIn,
  nickname,
  unreadNotificationCount = 0,
  onClickLogin,
  onClickNotificationList,
  onClickMyDetail,
  onClickNoticeList,
  onClickQna,
  onClickMyRealPriceList,
  onClickTransactionHistory,
  onClickFAQ,
  onClickNegoMoney,
  onClickCoupons,
  onClickNegoPoint,
  onClickServiceInfo,
  onClickMyAddress,
  onClickDeveloper,
}: Props) {
  return (
    <div tw="w-full max-w-mobile mx-auto flex flex-col h-full bg-white">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1 leading-none">마이페이지</NavigationHeader.Title>
        {loggedIn && (
          <NavigationHeader.Button tw="ml-auto" onClick={onClickNotificationList}>
            <div tw="relative">
              <BellIcon />
              {unreadNotificationCount > 0 && (
                <span tw="absolute right-1 top-0 translate-x-1/2 text-[8px] text-white  font-bold leading-none px-1 h-3 bg-red rounded-full inline-flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </div>
          </NavigationHeader.Button>
        )}
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto pb-[5.75rem]">
        {isLoading && (
          <div tw="h-40 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {!isLoading && loggedIn && (
          <>
            <MobMySummary
              profileImagePath={defaultAvatar}
              nickname={nickname}
              onClickMyDetail={onClickMyDetail}
              onClickCoupons={onClickCoupons}
              onClickNegoPoint={onClickNegoPoint}
              onClickNegoMoney={onClickNegoMoney}
            />
            <Separator />
            <MyListingsSummary onClickMyAddress={onClickMyAddress} />
          </>
        )}
        {!isLoading && !loggedIn && (
          <div tw="mt-5 mb-14">
            <LoginRequired onClickLogin={onClickLogin} />
          </div>
        )}
        <Separator />
        <div tw="pt-5">
          <MyPageNavigationList>
            {loggedIn && (
              <>
                <MyPageNavigationList.Item title="관심실거래가 현황" onClick={onClickMyRealPriceList} />
                <MyPageNavigationList.Item title="거래참여 이력" onClick={onClickTransactionHistory} />
              </>
            )}
            <MyPageNavigationList.Item title="네고시오 소개" />
            <MyPageNavigationList.Item title="공지사항" onClick={onClickNoticeList} />
            <MyPageNavigationList.Item title="자주 묻는 질문" onClick={onClickFAQ} />
            {loggedIn && <MyPageNavigationList.Item title="서비스 문의" onClick={onClickQna} />}
            <MyPageNavigationList.Item title="서비스 정보" onClick={onClickServiceInfo} />
            {process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'test' && (
              <MyPageNavigationList.Item title="개발자 설정" onClick={onClickDeveloper} />
            )}
          </MyPageNavigationList>
        </div>
      </div>
      <div tw="w-full max-w-mobile fixed bottom-0 left-auto right-auto">
        <MobGlobalNavigation />
      </div>
    </div>
  );
}
