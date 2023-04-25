import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Paths from '@/constants/paths';
import MyRegisteredListings from '.';

export default {
  title: 'templates/MyRegisteredListings',
  component: MyRegisteredListings,
} as ComponentMeta<typeof MyRegisteredListings>;

export const Default: ComponentStory<typeof MyRegisteredListings> = (args) => (
  <Panel>
    <MyRegisteredListings {...args} />
  </Panel>
);

Default.args = {
  tab: 1,

  myRegisteringListingCount: 3,
  myActiveListingCount: 3,
  myContractCompleteListingCount: 3,
  myCancelledListingCount: 3,

  myRegisteringListingData: [
    {
      listingId: 3056,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '서울 서초구 신반포로 270 반포자이아파트 101동 402호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 500000000,
      monthlyRentFee: 0,
      eubmyundong: '반포동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
    {
      listingId: 2991,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '경기 성남시 분당구 분당내곡로 155 비동 401호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '소유자 동의가 필요합니다.',
    },
    {
      listingId: 2958,
      thumbnailFullPath:
        'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/29584H27BKtQxvkqN4rD_thumb',
      listingTitle: '경기 성남시 분당구 분당내곡로 155 분당내곡로 비동 905호',
      realestateType: 2,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
  ],
  myActiveListingData: [
    {
      listingId: 3056,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '서울 서초구 신반포로 270 반포자이아파트 101동 402호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 500000000,
      monthlyRentFee: 0,
      eubmyundong: '반포동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
    {
      listingId: 2991,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '경기 성남시 분당구 분당내곡로 155 비동 401호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '소유자 동의가 필요합니다.',
    },
    {
      listingId: 2958,
      thumbnailFullPath:
        'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/29584H27BKtQxvkqN4rD_thumb',
      listingTitle: '경기 성남시 분당구 분당내곡로 155 분당내곡로 비동 905호',
      realestateType: 2,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
  ],
  myContractCompleteListingData: [
    {
      listingId: 3056,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '서울 서초구 신반포로 270 반포자이아파트 101동 402호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 500000000,
      monthlyRentFee: 0,
      eubmyundong: '반포동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
    {
      listingId: 2991,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '경기 성남시 분당구 분당내곡로 155 비동 401호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '소유자 동의가 필요합니다.',
    },
    {
      listingId: 2958,
      thumbnailFullPath:
        'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/29584H27BKtQxvkqN4rD_thumb',
      listingTitle: '경기 성남시 분당구 분당내곡로 155 분당내곡로 비동 905호',
      realestateType: 2,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
  ],
  myCancelledListingData: [
    {
      listingId: 3056,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '서울 서초구 신반포로 270 반포자이아파트 101동 402호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 500000000,
      monthlyRentFee: 0,
      eubmyundong: '반포동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
    {
      listingId: 2991,
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      listingTitle: '경기 성남시 분당구 분당내곡로 155 비동 401호',
      realestateType: 1,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '소유자 동의가 필요합니다.',
    },
    {
      listingId: 2958,
      thumbnailFullPath:
        'https://negocio-listing-photos.s3.ap-northeast-2.amazonaws.com/2023-4/29584H27BKtQxvkqN4rD_thumb',
      listingTitle: '경기 성남시 분당구 분당내곡로 155 분당내곡로 비동 905호',
      realestateType: 2,
      jeonyongArea: '',
      floorDescription: '',
      totalFloor: '',
      direction: '',
      buyOrRent: 1,
      quickSale: false,
      isParticipating: false,
      viewCount: 0,
      participantsCount: 0,
      tradeOrDepositPrice: 400000000,
      monthlyRentFee: 0,
      eubmyundong: '삼평동',
      isFavorite: false,
      labelText: '',
      statusText: '이미 등록된 매물이어서 중복등록이 불가합니다.',
    },
  ],
};

export const NoData: ComponentStory<typeof MyRegisteredListings> = (args) => (
  <Panel>
    <MyRegisteredListings {...args} />
  </Panel>
);

NoData.args = {
  tab: 1,

  myRegisteringListingCount: 3,
  myActiveListingCount: 3,
  myContractCompleteListingCount: 3,
  myCancelledListingCount: 3,

  myRegisteringListingData: [],
  myActiveListingData: [],
  myContractCompleteListingData: [],
  myCancelledListingData: [],
};
