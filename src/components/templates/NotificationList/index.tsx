import { NavigationHeader } from '@/components/molecules';
import TripleDotsIcon from '@/assets/icons/triple_dots.svg';
import { NotificationFilterTab } from '@/components/organisms';
// import tw, { styled } from 'twin.macro';

// const List = styled.div`
//   & > div:not(:first-of-type) > button > div {
//     ${tw`border-t border-t-gray-100`}
//   }
// `;

interface Props {
  tabIndex?: number;
  onChangeTabIndex?: (index: number) => void;
}

export default function NotificationList({ tabIndex, onChangeTabIndex }: Props) {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">알림</NavigationHeader.Title>
        <NavigationHeader.Button tw="ml-auto">
          <TripleDotsIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
      <div tw="mt-2">
        <NotificationFilterTab index={tabIndex} onChangeIndex={onChangeTabIndex} />
      </div>
    </div>
  );
}
