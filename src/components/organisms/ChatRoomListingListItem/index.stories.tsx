import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Paths from '@/constants/paths';
import ChatRoomListingListItem from '.';

export default {
  title: 'organisms/ChatRoomListingListItem',
  component: ChatRoomListingListItem,
} as ComponentMeta<typeof ChatRoomListingListItem>;

export const Default: ComponentStory<typeof ChatRoomListingListItem> = (args) => (
  <div>
    <ChatRoomListingListItem {...args} />
    <ChatRoomListingListItem {...args} labelText="가계약금 입금" />
    <ChatRoomListingListItem {...args} labelText="체결 매물" />
  </div>
);

Default.args = {
  listingId: 3200,
  listingStatus: 22,
  buyOrRent: 1,
  tradeOrDepositPrice: 8150000000,
  monthlyRentFee: 0,
  listingTitle: '도곡렉슬아파트 304동 301호',
  jeonyongArea: '84',
  thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
  floorDescription: '저층',
  totalFloor: '15',
  direction: '남향',
  labelText: '',
};

/*
{
  listingId: 3200,
  listingStatus: 22,
  buyOrRent: 2,
  tradeOrDepositPrice: 1500000000,
  monthlyRentFee: 0,
  listingTitle: '역삼동 단독',
  jeonyongArea: '84',
  thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
  floorDescription: '',
  totalFloor: '15',
  direction: '남향',
  labelText: '가계약금 입금',
}
*/
/*
{
  listingId: 3200,
  listingStatus: 22,
  buyOrRent: 2,
  tradeOrDepositPrice: 1500000000,
  monthlyRentFee: 0,
  listingTitle: '역삼동 단독',
  jeonyongArea: '84',
  thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
  floorDescription: '',
  totalFloor: '15',
  direction: '남향',
  labelText: '체결 매물',
}
*/
