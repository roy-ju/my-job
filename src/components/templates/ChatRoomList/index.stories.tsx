import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import { Panel } from '@/components/atoms';
import ChatRoomList from '.';

const mock = [
  {
    id: 1,
    officeName: '김네고 엄청나게 긴 이름의 공인중개사사사사사사',
    lastMessage:
      '최근 메세지가 들어갑니다 최근 메세지가 2줄 최금 네세지가 들어갑니다. 최근 메세지가 들어갑니다. 최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.',
    listingTitle: '도곡한라비발디프라펠리스 101동',
    additionalListingCount: 2,
    lastMessageTime: '2023-04-18T15:20:05+09:00',
    unreadMessageCount: 1,
    profileImagePath: defaultAvatar,
    active: true,
    chatRoomType: 1,
  },
  {
    id: 2,
    officeName: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    lastMessage:
      '최근 메세지가 들어갑니다 최근 메세지가 2줄 최금 네세지가 들어갑니다. 최근 메세지가 들어갑니다. 최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.',
    listingTitle: '도곡한라비발디프라펠리스 101동aaaaaaaaa',
    additionalListingCount: 2,
    lastMessageTime: '2023-04-12T21:28:41+09:00',
    unreadMessageCount: 0,
    profileImagePath: defaultAvatar,
    active: true,
    chatRoomType: 2,
  },
  {
    id: 3,
    officeName: '김네고 공인중개사',
    lastMessage: '다. 최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.',
    listingTitle: '도곡한라비발디프라펠리스 101동',
    additionalListingCount: 0,
    lastMessageTime: '2023-04-12T21:28:41+09:00',
    unreadMessageCount: 0,
    profileImagePath: defaultAvatar,
    active: true,
    chatRoomType: 2,
  },
  {
    id: 4,
    officeName: '김네고 공인중개사',
    lastMessage:
      '최근 메세지가 들어갑니다 최근 메세지가 2줄 최금 네세지가 들어갑니다. 최근 메세지가 들어갑니다. 최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.',
    listingTitle: '도곡한라비발디프라펠리스 101동',
    additionalListingCount: 2,
    lastMessageTime: '2023-04-12T21:28:41+09:00',
    unreadMessageCount: 100,
    profileImagePath: defaultAvatar,
    active: true,
    chatRoomType: 2,
  },
  {
    id: 5,
    officeName: '김네고 공인중개사',
    lastMessage: '.',
    listingTitle: '도곡한라비발디프라펠리스 101동',
    additionalListingCount: 2,
    lastMessageTime: '2023-04-12T21:28:41+09:00',
    unreadMessageCount: 100,
    profileImagePath: defaultAvatar,
    active: true,
    chatRoomType: 1,
  },
  {
    id: 6,
    officeName: '김네고 공인중개사',
    lastMessage:
      '최근 메세지가 들어갑니다 최근 메세지가 2줄 최금 네세지가 들어갑니다. 최근 메세지가 들어갑니다. 최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.',
    listingTitle: '도곡한라비발디프라펠리스 101동',
    additionalListingCount: 2,
    lastMessageTime: '2023-04-12T21:28:41+09:00',
    unreadMessageCount: 100,
    profileImagePath: defaultAvatar,
    active: true,
    chatRoomType: 1,
  },
];

export default {
  title: 'templates/ChatRoomList',
  component: ChatRoomList,
} as ComponentMeta<typeof ChatRoomList>;

export const Default: ComponentStory<typeof ChatRoomList> = (args) => (
  <Panel>
    <ChatRoomList {...args} />
  </Panel>
);

Default.args = {
  list: mock,
  isLoading: false,
};

export const NoItems: ComponentStory<typeof ChatRoomList> = (args) => (
  <Panel>
    <ChatRoomList {...args} />
  </Panel>
);

NoItems.args = {
  list: [],
  isLoading: false,
};
