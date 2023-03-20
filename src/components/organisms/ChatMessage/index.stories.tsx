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

export const AgentMultiple: ComponentStory<typeof ChatMessage> = () => (
  <ChatMessage>
    <ChatMessage.Avatar src={defaultAvatar} />
    <ChatMessage.SenderName>공인중개사 김네고</ChatMessage.SenderName>
    <ChatMessage.Bubble>협의 내용입니다.</ChatMessage.Bubble>
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
    <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
  </ChatMessage>
);

export const UserMultiple: ComponentStory<typeof ChatMessage> = () => (
  <ChatMessage variant="nego">
    <ChatMessage.Bubble>협의 내용입니다. </ChatMessage.Bubble>
    <ChatMessage.Bubble>
      거래등록 요청에 따라 “서방공인중개사”와의 채팅방이 개설되었습니다. ㅋㅋㅋㅋㅋ
    </ChatMessage.Bubble>
    <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
  </ChatMessage>
);

export const AgentUser: ComponentStory<typeof ChatMessage> = () => (
  <div tw="flex flex-col gap-6 w-[380px] bg-white py-6 px-5">
    <ChatMessage>
      <ChatMessage.Avatar src={defaultAvatar} />
      <ChatMessage.SenderName>공인중개사 김네고</ChatMessage.SenderName>
      <ChatMessage.Bubble>협의 내용입니다.</ChatMessage.Bubble>
      <ChatMessage.Bubble>
        거래등록 요청에 따라 “서방공인중개사”와의 채팅방이 개설되었습니다. ㅋㅋㅋㅋㅋ
      </ChatMessage.Bubble>
      <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
    </ChatMessage>
    <div tw="pl-2.5">
      <ChatMessage variant="nego">
        <ChatMessage.Bubble>여기는 어떻게 되는건가요?</ChatMessage.Bubble>
        <ChatMessage.Bubble>여기는 어떻게 되는건가요? 이렇게 저렇게 요렇게?</ChatMessage.Bubble>
        <ChatMessage.SentTime>오전 12:57</ChatMessage.SentTime>
      </ChatMessage>
    </div>
  </div>
);
