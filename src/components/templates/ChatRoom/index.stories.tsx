import { ChatUserType } from '@/constants/enums';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import { Panel } from '@/components/atoms';
import getRandomString from '@/utils/getRandomString';
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
  agentName: '김네고',
  agentProfileImagePath: defaultAvatar,
  chatMessages: Array(3)
    .fill(0)
    .map((_, index) => ({
      id: index,
      name: '네고시오',
      message: '협의 내용입니다.',
      chatUserType: index % 2 === 0 ? ChatUserType.Agent : ChatUserType.Seller,
      profileImagePath: defaultAvatar,
      sentTime: '2023-03-21T03:43:40.133Z',
      agentReadTime: null,
    })),
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
  agentName: '김네고',
  agentProfileImagePath: defaultAvatar,
  chatMessages: Array(100)
    .fill(0)
    .map((_, index) => ({
      id: index,
      name: '네고시오',
      message: getRandomString(10, 100),
      chatUserType: index % 2 === 0 ? ChatUserType.Agent : ChatUserType.Seller,
      profileImagePath: defaultAvatar,
      sentTime: '2023-03-21T03:43:40.133Z',
      agentReadTime: null,
    })),
};
