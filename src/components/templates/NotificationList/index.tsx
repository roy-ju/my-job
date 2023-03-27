import { Button, InfiniteScroll, Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { NotificationFilterTab, NotificaitonListItem } from '@/components/organisms';
import tw, { styled } from 'twin.macro';

export interface INotificationListItem {
  id: number;
  title: string;
  message: string;
  listingTitle: string;
  createdTime: string;
  unread: boolean;
}

const List = styled(InfiniteScroll)`
  & > div:not(:first-of-type) > button > div {
    ${tw`border-t border-t-gray-100`}
  }
`;

const headerItems = ['삭제하기', '알림설정'];

interface Props {
  tabIndex?: number;
  notifications?: INotificationListItem[];
  isLoading?: boolean;
  isDeleting?: boolean;
  checkedState?: Record<number, boolean>;
  onNext?: () => void;
  onChangeTabIndex?: (index: number) => void;
  onClickHeaderItem?: (index: number, item: string) => void;
  onClickNotification?: (id: number) => void;
  onChangeNotificationChecked?: (id: number, checked: boolean) => void;
  onDeleteNotifications?: () => void;
}

export default function NotificationList({
  tabIndex,
  notifications = [],
  checkedState,
  isLoading = false,
  isDeleting = false,
  onNext,
  onChangeTabIndex,
  onClickHeaderItem,
  onClickNotification,
  onChangeNotificationChecked,
  onDeleteNotifications,
}: Props) {
  return (
    <div tw="relative h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">알림</NavigationHeader.Title>
        <NavigationHeader.MoreButton items={headerItems} onClickItem={onClickHeaderItem} />
      </NavigationHeader>
      <div tw="mt-2">
        <NotificationFilterTab index={tabIndex} onChangeIndex={onChangeTabIndex} />
      </div>
      {isLoading ? (
        <Loading tw="text-center mt-10" />
      ) : (
        <List tw="flex-1 min-h-0 overflow-scroll" onNext={onNext}>
          {notifications.map((item) => (
            <NotificaitonListItem
              key={item.id}
              title={item.title}
              message={item.message}
              listingTitle={item.listingTitle}
              createdTime={item.createdTime}
              unread={item.unread}
              checkbox={isDeleting}
              checked={checkedState ? Boolean(checkedState[item.id]) : undefined}
              onClick={() => onClickNotification?.(item.id)}
              onChange={(checked) => onChangeNotificationChecked?.(item.id, checked)}
            />
          ))}
        </List>
      )}
      {isDeleting && (
        <div tw="absolute left-0 bottom-0 w-full px-5 py-4 bg-white shadow-persistentBottomBar">
          <Button variant="secondary" size="bigger" tw="w-full" onClick={onDeleteNotifications}>
            삭제하기
          </Button>
        </div>
      )}
    </div>
  );
}
