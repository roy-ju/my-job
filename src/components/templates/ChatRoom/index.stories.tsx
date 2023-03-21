import { ChatUserType } from '@/constants/enums';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ChatRoom from '.';

export default {
  title: 'templates/ChatRoom',
  component: ChatRoom,
} as ComponentMeta<typeof ChatRoom>;

export const Default: ComponentStory<typeof ChatRoom> = (args) => (
  <div tw="w-[380px] h-full bg-white">
    <ChatRoom {...args} />
  </div>
);

Default.args = {
  textFieldDisabled: true,
  title: '공개용 주소 최대 22자 모두 노출 가능',
  officeName: '네고시오 공인중개사사무소',
  agentName: '김네고',
  agentDescription:
    '이곳은네고시오공인중개사의자기소개가보여지는곳입니다 이곳은네이곳은네고시오공인중개사의자기소개가보여',
  chatMessages: [
    {
      id: 1,
      name: '네고시오',
      message: '협의 내용입니다.',
      chatUserType: ChatUserType.Agent,
      sentTime: '오전 12:58',
    },
    {
      id: 2,
      name: '네고시오',
      message: '거래등록 요청에 따라 “서방공인중개사”와의 채팅방이 개설되었습니다. ㅋㅋㅋㅋㅋ',
      chatUserType: ChatUserType.Agent,
      sentTime: '오전 12:58',
    },
    {
      id: 3,
      name: '',
      message: '여기는 어떻게 되는건가요? 이렇게 저렇게 요렇게?',
      chatUserType: ChatUserType.Buyer,
      sentTime: '오전 12:58',
    },
  ],
};
