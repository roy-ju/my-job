import { ChatMessage } from '@/components/organisms';
import { ChatUserType } from '@/constants/enums';
import { StaticImageData } from 'next/image';
import { memo, useMemo } from 'react';

export interface IChatMessage {
  id: number;
  chatUserType: ChatUserType;
  profileImagePath?: string | StaticImageData;
  name: string;
  message: string;
  sentTime: string;
}

const variantByType: Record<ChatUserType, 'gray' | 'nego' | 'system'> = {
  [ChatUserType.Agent]: 'gray',
  [ChatUserType.Buyer]: 'nego',
  [ChatUserType.Seller]: 'nego',
  [ChatUserType.System]: 'system',
};

export default memo(
  ({ chat, prevChat, nextChat }: { chat: IChatMessage; prevChat?: IChatMessage; nextChat?: IChatMessage }) => {
    const variant = useMemo(() => variantByType[chat.chatUserType] ?? 'system', [chat.chatUserType]);

    const shouldRenderAvatar = useMemo(() => {
      if (chat.chatUserType === ChatUserType.Agent) {
        if (!prevChat) return true;
        if (prevChat.chatUserType !== chat.chatUserType) return true;
      }
      return false;
    }, [chat, prevChat]);

    const shouldRenderSentTime = useMemo(() => {
      if (!nextChat) return true;
      if (nextChat.chatUserType !== chat.chatUserType) return true;
      return false;
    }, [nextChat, chat]);

    const extraPaddingBottom = useMemo(() => {
      if (nextChat && nextChat.chatUserType !== chat.chatUserType) {
        return '24px';
      }
      return '8px';
    }, [nextChat, chat]);

    return (
      <div tw="px-5" style={{ paddingBottom: extraPaddingBottom }}>
        <ChatMessage variant={variant}>
          {shouldRenderAvatar && <ChatMessage.Avatar src={chat.profileImagePath} />}
          {shouldRenderAvatar && <ChatMessage.SenderName>{chat.name}</ChatMessage.SenderName>}
          <ChatMessage.Bubble>{chat.message}</ChatMessage.Bubble>
          {shouldRenderSentTime && <ChatMessage.SentTime format="LT">{chat.sentTime}</ChatMessage.SentTime>}
        </ChatMessage>
      </div>
    );
  },
  (prev, next) =>
    prev.chat.id === next.chat.id && prev.prevChat?.id === next.prevChat?.id && prev.nextChat?.id === next.nextChat?.id,
);
