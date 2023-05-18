import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import ChatRoomListItem from '.';

export default {
  title: 'organisms/ChatRoomListItem',
  component: ChatRoomListItem,
} as ComponentMeta<typeof ChatRoomListItem>;

export const Default: ComponentStory<typeof ChatRoomListItem> = (args) => <ChatRoomListItem {...args} />;

Default.args = {
  officeName: 'officeName',
  lastMessage: 'lastMessage',
  listingTitle: 'listingTitle',
  lastMessageTime: '2023-04-17T05:21:42.607Z',
  unreadMessageCount: 0,
  profileImagePath: defaultAvatar,
  isSeller: true,
};

export const Example: ComponentStory<typeof ChatRoomListItem> = (args) => <ChatRoomListItem {...args} />;

Example.args = {
  officeName: '김네고 공인중개사',
  lastMessage:
    '최근 메세지가 들어갑니다 최근 메세지가 2줄 최금 네세지가 들어갑니다. 최근 메세지가 들어갑니다. 최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.  최근 메세지가 들어갑니다.',
  listingTitle: '도곡한라비발디프라펠리스 101동',
  additionalListingCount: 2,
  lastMessageTime: '2023-04-12T21:28:41+09:00',
  unreadMessageCount: 100,
  profileImagePath: defaultAvatar,
  isSeller: false,
};
