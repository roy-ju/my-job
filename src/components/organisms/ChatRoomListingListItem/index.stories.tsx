import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Paths from '@/constants/paths';
import ChatRoomListingListItem from '.';

export default {
  title: 'organisms/ChatRoomListingListItem',
  component: ChatRoomListingListItem,
} as ComponentMeta<typeof ChatRoomListingListItem>;

export const Default: ComponentStory<typeof ChatRoomListingListItem> = (args) => <ChatRoomListingListItem {...args} />;

Default.args = {
  listingId: 3200,
  listingStatus: 22,
  buyOrRent: 2,
  tradeOrDepositPrice: 1500000000,
  monthlyRentFee: 0,
  listingTitle: '역삼동 단독',
  jeonyongArea: '84',
  thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
  floorDescription: '',
  totalFloor: '1',
  direction: '남향',
  labelText: '등록신청',
};
