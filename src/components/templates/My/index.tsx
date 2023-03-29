import { NavigationHeader } from '@/components/molecules';
import BellIcon from '@/assets/icons/bell.svg';
import { MyPageNavigationList, MySummary } from '@/components/organisms';
import { Separator } from '@/components/atoms';
import defaultAvatar from '@/../public/static/images/default_avatar.png';

interface Props {
  isLoading?: boolean;
  nickname?: string;
  unreadNotificationCount?: number;
  onClickNotificationList?: () => void;
  onClickMyDetail?: () => void;
  onClickNoticeList?: () => void;
}

export default function My({
  isLoading,
  nickname,
  unreadNotificationCount = 0,
  onClickNotificationList,
  onClickMyDetail,
  onClickNoticeList,
}: Props) {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1 leading-none">My네고</NavigationHeader.Title>
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
      <MySummary
        isLoading={isLoading}
        profileImagePath={defaultAvatar}
        nickname={nickname}
        onClickMyDetail={onClickMyDetail}
      />
      <Separator />
      <div tw="pt-5">
        <MyPageNavigationList>
          <MyPageNavigationList.Item title="관심실거래가 현황" />
          <MyPageNavigationList.Item title="거래참여 이력" />
          <MyPageNavigationList.Item title="네고시오 소개" />
          <MyPageNavigationList.Item title="공지사항" onClick={onClickNoticeList} />
          <MyPageNavigationList.Item title="자주 묻는 질문" />
          <MyPageNavigationList.Item title="서비스 문의" />
          <MyPageNavigationList.Item title="서비스 정보" />
        </MyPageNavigationList>
      </div>
    </div>
  );
}
