import { NavigationHeader } from '@/components/molecules';
import { NotificationFilterTab } from '@/components/organisms';
// import tw, { styled } from 'twin.macro';

// const List = styled.div`
//   & > div:not(:first-of-type) > button > div {
//     ${tw`border-t border-t-gray-100`}
//   }
// `;

const headerItems = ['삭제하기', '알림설정'];

interface Props {
  tabIndex?: number;
  onChangeTabIndex?: (index: number) => void;
  onClickHeaderItem?: (index: number, item: string) => void;
}

export default function NotificationList({ tabIndex, onChangeTabIndex, onClickHeaderItem }: Props) {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">알림</NavigationHeader.Title>
        <NavigationHeader.MoreButton items={headerItems} onClickItem={onClickHeaderItem} />
      </NavigationHeader>
      <div tw="mt-2">
        <NotificationFilterTab index={tabIndex} onChangeIndex={onChangeTabIndex} />
      </div>
    </div>
  );
}
