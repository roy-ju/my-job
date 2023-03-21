import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import ChatRoomList from '.';

const mock = [
  {
    id: 1,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 1,
    profileImagePath: defaultAvatar,
    active: true,
  },
  {
    id: 2,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 2,
    profileImagePath: defaultAvatar,
    active: false,
  },
  {
    id: 3,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 99,
    profileImagePath: defaultAvatar,
    active: false,
  },
  {
    id: 4,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 999,
    profileImagePath: defaultAvatar,
    active: false,
  },
  {
    id: 5,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 999,
    profileImagePath: defaultAvatar,
    active: false,
  },
  {
    id: 6,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 0,
    profileImagePath: defaultAvatar,
    active: false,
  },
  {
    id: 7,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 999,
    profileImagePath: defaultAvatar,
    active: false,
  },
  {
    id: 8,
    title: '최대 22자 공개용주소 모두 들어갑니다.',
    chatRoomType: '상담',
    agentDescription: '최대 1줄로 중개사무소명이 들어갑니다. 길 경우에는 ...',
    lastMessage: '최근 메시지가 들어갑니다. 최대 2줄까지 노출됩니다. 메시지 내용이 길 경우에는 이렇게 ',
    listingStatus: '매물 STATUS',
    lastMessageTime: '2023-01-01',
    unreadMessageCount: 999,
    profileImagePath: defaultAvatar,
    active: false,
  },
];

export default {
  title: 'templates/ChatRoomList',
  component: ChatRoomList,
} as ComponentMeta<typeof ChatRoomList>;

export const Default: ComponentStory<typeof ChatRoomList> = (args) => (
  <div tw="w-[380px] h-full bg-white">
    <ChatRoomList {...args} />
  </div>
);

Default.args = {
  list: mock,
  isLoading: false,
};

export const NoItems: ComponentStory<typeof ChatRoomList> = (args) => (
  <div tw="w-[380px] h-full bg-white">
    <ChatRoomList {...args} />
  </div>
);

NoItems.args = {
  list: [],
  isLoading: false,
};
