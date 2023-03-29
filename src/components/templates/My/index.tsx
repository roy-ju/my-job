import { NavigationHeader } from '@/components/molecules';
import BellIcon from '@/assets/icons/bell.svg';
import { LoginRequired, MyPageNavigationList, MySummary } from '@/components/organisms';
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
}

export default function My({
  isLoading,
  loggedIn,
  nickname,
  unreadNotificationCount = 0,
  onClickLogin,
  onClickNotificationList,
  onClickMyDetail,
  onClickNoticeList,
}: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1 leading-none">마이페이지</NavigationHeader.Title>
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
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        {isLoading && (
          <div tw="h-40 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {!isLoading && loggedIn && (
          <MySummary profileImagePath={defaultAvatar} nickname={nickname} onClickMyDetail={onClickMyDetail} />
        )}
        {!isLoading && !loggedIn && (
          <div tw="mt-5 mb-14">
            <LoginRequired onClickLogin={onClickLogin} />
          </div>
        )}
        <Separator />
        <div tw="pt-5">
          <MyPageNavigationList>
            <MyPageNavigationList.Item title="네고시오 소개" />
            <MyPageNavigationList.Item title="공지사항" onClick={onClickNoticeList} />
            <MyPageNavigationList.Item title="자주 묻는 질문" />
            <MyPageNavigationList.Item title="서비스 문의" />
            <MyPageNavigationList.Item title="서비스 정보" />
          </MyPageNavigationList>
        </div>
      </div>
    </div>
  );
}
