import { Children, isValidElement, ReactNode, useMemo } from 'react';
import tw from 'twin.macro';
import { Avatar, AvatarType } from './Avatar';
import { Bubble, BubbleType } from './Bubble';
import ChatMessageContext from './ChatMessageContext';
import { SenderName, SenderNameType } from './SenderName';
import { SentTime, SentTimeType } from './SentTime';

function getBubble(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === BubbleType);
}

function getSentTime(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === SentTimeType);
}

function getSenderName(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === SenderNameType);
}

function getAvatar(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === AvatarType);
}

interface ContainerProps {
  variant?: 'nego' | 'gray';
  children?: ReactNode;
}

function Container({ variant, children }: ContainerProps) {
  const context = useMemo(() => ({ variant }), [variant]);

  const bubble = getBubble(children);
  const sentTime = getSentTime(children);
  const senderName = getSenderName(children);
  const avatar = getAvatar(children);

  return (
    <ChatMessageContext.Provider value={context}>
      <div tw="flex items-start gap-3">
        {avatar}
        <div tw="flex flex-col gap-1.5">
          {senderName}
          <div css={[tw`flex items-end gap-1`, variant === 'nego' && tw`flex-row-reverse`]}>
            <div css={[tw`flex flex-col gap-2`, variant === 'nego' && tw`items-end`]}>{bubble}</div>
            {sentTime}
          </div>
        </div>
      </div>
    </ChatMessageContext.Provider>
  );
}

export default Object.assign(Container, { Avatar, Bubble, SentTime, SenderName });
