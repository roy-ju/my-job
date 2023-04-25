import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import Paths from '@/constants/paths';
import MyFavoriteList from '.';

export default {
  title: 'templates/MyFavoriteList',
  component: MyFavoriteList,
} as ComponentMeta<typeof MyFavoriteList>;

export const Default: ComponentStory<typeof MyFavoriteList> = (args) => (
  <Panel>
    <MyFavoriteList {...args} />
  </Panel>
);

Default.args = {
  listingSortingType: '등록일순',
  listingList: [
    {
      listingId: 1301,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '매봉삼성아파트 106동 1601호',
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
      labelText: '제안중',
      statusText: '',
    },
    {
      listingId: 1301,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '매봉삼성아파트 106동 1601호',
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
      labelText: '제안중',
      statusText: '',
    },
    {
      listingId: 1301,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '매봉삼성아파트 106동 1601호',
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
      labelText: '제안중',
      statusText: '',
    },
  ],
  danjiList: [
    {
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
    },
    {
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
    },
    {
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
    },
  ],
  listingFavoriteCount: 3,
  danjiFavoriteCount: 3,
};

export const NoData: ComponentStory<typeof MyFavoriteList> = (args) => (
  <Panel>
    <MyFavoriteList {...args} />
  </Panel>
);
