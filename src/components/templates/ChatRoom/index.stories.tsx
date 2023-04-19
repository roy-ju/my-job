import { ChatUserType } from '@/constants/enums';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import { Panel } from '@/components/atoms';
import Paths from '@/constants/paths';
import ChatRoom from '.';

export default {
  title: 'templates/ChatRoom',
  component: ChatRoom,
} as ComponentMeta<typeof ChatRoom>;

export const Default: ComponentStory<typeof ChatRoom> = (args) => (
  <Panel>
    <ChatRoom {...args} />
  </Panel>
);

Default.args = {
  isLoading: false,
  textFieldDisabled: true,
  title: '공개용 주소 최대 22자 모두 노출 가능',
  officeName: '네고시오 공인중개사사무소',
  agentName: '김네고',
  agentDescription:
    '이곳은네고시오공인중개사의자기소개가보여지는곳입니다 이곳은네이곳은네고시오공인중개사의자기소개가보여',
  agentProfileImagePath: defaultAvatar,
  additionalListingCount: 2,
  chatMessages: Array(3)
    .fill(0)
    .map((_, index) => ({
      id: index,
      name: '네고시오',
      message: '협의 내용입니다.',
      chatUserType: index % 2 === 0 ? ChatUserType.Agent : ChatUserType.Seller,
      profileImagePath: defaultAvatar,
      sentTime: '2023-03-21T03:43:40.133Z',
    })),

  list: [
    {
      listingId: 1,
      buyOrRent: 2,
      tradeOrDepositPrice: 111111111,
      monthlyRentFee: 1111111,
      listingTitle: '펜트라우스 104동',
      jeonyongArea: '44',
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      floorDescription: '저',
      totalFloor: '22',
      direction: '남',
    },
    {
      listingId: 1,
      buyOrRent: 2,
      tradeOrDepositPrice: 111111111,
      monthlyRentFee: 1111111,
      listingTitle: '펜트라우스 104동',
      jeonyongArea: '44',
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      floorDescription: '저',
      totalFloor: '22',
      direction: '남',
    },
    {
      listingId: 1,
      buyOrRent: 2,
      tradeOrDepositPrice: 111111111,
      monthlyRentFee: 1111111,
      listingTitle: '펜트라우스 104동',
      jeonyongArea: '44',
      thumbnailFullPath: Paths.DEFAULT_APARTMENT_IMAGE_PATH,
      floorDescription: '저',
      totalFloor: '22',
      direction: '남',
    },
  ],
};

export const ThousandsMessages: ComponentStory<typeof ChatRoom> = (args) => (
  <Panel>
    <ChatRoom {...args} />
  </Panel>
);

ThousandsMessages.args = {
  isLoading: false,
  textFieldDisabled: true,
  title: '공개용 주소 최대 22자 모두 노출 가능',
  officeName: '네고시오 공인중개사사무소',
  agentName: '김네고',
  agentDescription:
    '이곳은네고시오공인중개사의자기소개가보여지는곳입니다 이곳은네이곳은네고시오공인중개사의자기소개가보여',
  agentProfileImagePath: defaultAvatar,
  chatMessages: Array(1000)
    .fill(0)
    .map((_, index) => ({
      id: index,
      name: '네고시오',
      message: '협의 내용입니다.',
      chatUserType: index % 2 === 0 ? ChatUserType.Agent : ChatUserType.Seller,
      profileImagePath: defaultAvatar,
      sentTime: '2023-03-21T03:43:40.133Z',
    })),
};
