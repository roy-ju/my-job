import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import Paths from '@/constants/paths';
import MyParticipatingListings from '.';

export default {
  title: 'templates/MyParticipatingListings',
  component: MyParticipatingListings,
} as ComponentMeta<typeof MyParticipatingListings>;

export const Default: ComponentStory<typeof MyParticipatingListings> = (args) => (
  <Panel>
    <MyParticipatingListings {...args} />
  </Panel>
);

Default.args = {
  tab: 1,
  biddingStatus: {
    submitted: {
      count: 3,
      data: [
        {
          listingId: 3056,
          thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
          listingTitle: '서울 서초구 신반포로 270 반포자이아파트 101동 402호',
          realestateType: 10,
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
          listingId: 3056,
          thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
          listingTitle: '서울 서초구 신반포로 270 반포자이아파트 101동 402호',
          realestateType: 10,
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
          listingId: 3056,
          thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
          listingTitle: '서울 서초구 신반포로 270 반포자이아파트 101동 402호',
          realestateType: 10,
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
      ],
      incrementalPageNumber: () => {},
      mutate: () => {},
      isLoading: true,
    },
    accepted: {
      count: 3,
      data: [
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
      ],
      incrementalPageNumber: () => {},
      mutate: () => {},
      isLoading: true,
    },
    preContractCompleted: {
      count: 3,
      data: [
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
      ],
      incrementalPageNumber: () => {},
      mutate: () => {},
      isLoading: true,
    },
    past: {
      count: 3,
      data: [
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
      ],
      incrementalPageNumber: () => {},
      mutate: () => {},
      isLoading: true,
    },
  },
};
