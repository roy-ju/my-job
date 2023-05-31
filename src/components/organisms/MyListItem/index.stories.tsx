import { Panel } from '@/components/atoms';
import type { ComponentStory } from '@storybook/react';
import Paths from '@/constants/paths';
import MyListItem from '.';

const meta = {
  title: 'organisms/MyListItem',
};

export default meta;

export const DanjiItem: ComponentStory<typeof MyListItem.Danji> = (args) => (
  <Panel>
    <MyListItem.Danji {...args} />
  </Panel>
);

export const ListingItem: ComponentStory<typeof MyListItem.Listing> = (args) => (
  <Panel>
    <MyListItem.Listing {...args} />
  </Panel>
);

export const RegisteringListingItem: ComponentStory<typeof MyListItem.RegisteringListing> = (args) => (
  <Panel>
    <MyListItem.RegisteringListing {...args} />
  </Panel>
);

DanjiItem.args = {
  danjiId: 3,
  pnu: '4113510900107380000',
  realestateType: 10,
  eubmyundong: '삼평동',
  danjiName: '봇들마을7단지',
  roadNameAddress: '경기도 성남시 분당구 동판교로 155',
  totalSaedaeCount: '585',
  year: '2009',
  month: '07',
  day: '15',
  jeonyongMin: '84.5',
  jeonyongMax: '126.62',
  buyCount: 1,
  jeonsaeCount: 0,
  wolsaeCount: 0,
  isFavorite: true,
  dongCount: 3,
};

ListingItem.args = {
  listingId: 1301,
  thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
  listingTitle: '106동 1601호',
  realestateType: 10,
  jeonyongArea: '84.55',
  floorDescription: '고층',
  totalFloor: '18',
  direction: '남향',
  buyOrRent: 1,
  quickSale: true,
  isParticipating: false,
  viewCount: 3,
  participantsCount: 1,
  tradeOrDepositPrice: 16000000000,
  monthlyRentFee: 0,
  eubmyundong: '신갈동',
  isFavorite: true,
  labelText: '협의중',
};

RegisteringListingItem.args = {
  listingId: 1301,
  thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
  listingTitle: '106동 1601호',
  realestateType: 10,
  jeonyongArea: '84.55',
  floorDescription: '고층',
  totalFloor: '18',
  direction: '남향',
  buyOrRent: 1,
  quickSale: true,
  isParticipating: false,
  viewCount: 3,
  participantsCount: 1,
  tradeOrDepositPrice: 16000000000,
  monthlyRentFee: 0,
  eubmyundong: '신갈동',
  isFavorite: true,
  labelText: '협의중',
};
