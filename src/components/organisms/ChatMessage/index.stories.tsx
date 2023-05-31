import type { ComponentMeta, ComponentStory } from '@storybook/react';
import defaultAvatar from '@/../public/static/images/default_avatar.png';
import ChatMessage from '.';

export default {
  title: 'organisms/ChatMessage',
  component: ChatMessage,
} as ComponentMeta<typeof ChatMessage>;

export const AgentDefault: ComponentStory<typeof ChatMessage> = () => (
  <ChatMessage>
    <ChatMessage.Avatar src={defaultAvatar} />
    <ChatMessage.SenderName>공인중개사 김네고</ChatMessage.SenderName>
    <ChatMessage.Bubble>
      거래등록 요청에 따라 “서방공인중개사”와의 채팅방이 개설되었습니다. ㅋㅋㅋㅋㅋ
    </ChatMessage.Bubble>
    <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
  </ChatMessage>
);

export const UserDefault: ComponentStory<typeof ChatMessage> = () => (
  <ChatMessage variant="nego">
    <ChatMessage.Bubble>
      거래등록 요청에 따라 “서방공인중개사”와의 채팅방이 개설되었습니다. ㅋㅋㅋㅋㅋ
    </ChatMessage.Bubble>
    <ChatMessage.ReadIndicator>읽기전</ChatMessage.ReadIndicator>
    <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
  </ChatMessage>
);

export const System: ComponentStory<typeof ChatMessage> = () => (
  <ChatMessage variant="system">
    <ChatMessage.Bubble>
      거래등록 요청에 따라 “서방공인중개사”와의 채팅방이 개설되었습니다. ㅋㅋㅋㅋㅋ
    </ChatMessage.Bubble>
  </ChatMessage>
);

export const AgentUser: ComponentStory<typeof ChatMessage> = () => (
  <div tw="flex flex-col w-[380px] bg-white py-6 px-5 gap-2">
    <ChatMessage>
      <ChatMessage.Avatar src={defaultAvatar} />
      <ChatMessage.SenderName>공인중개사 김네고</ChatMessage.SenderName>
      <ChatMessage.Bubble>협의 내용입니다.</ChatMessage.Bubble>
      <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
    </ChatMessage>
    <ChatMessage>
      <ChatMessage.Bubble>여기는 어떻게 되는건가요?</ChatMessage.Bubble>
      <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
    </ChatMessage>
    <ChatMessage variant="system">
      <ChatMessage.Bubble>여기는 어떻게 되는건가요?</ChatMessage.Bubble>
    </ChatMessage>
    <ChatMessage variant="nego">
      <ChatMessage.Bubble>여기는 어떻게 되는건가요?</ChatMessage.Bubble>
    </ChatMessage>
    <ChatMessage variant="nego">
      <ChatMessage.Bubble>여기는 어떻게 되는건가요? 여기는 어떻게 되는건가요?</ChatMessage.Bubble>
      <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
    </ChatMessage>
  </div>
);
