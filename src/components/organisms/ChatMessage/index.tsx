import { Children, isValidElement, ReactNode, useMemo } from 'react';
import tw from 'twin.macro';
import { Avatar, AvatarType } from './Avatar';
import { Bubble, BubbleType } from './Bubble';
import ChatMessageContext from './ChatMessageContext';
import { SenderName, SenderNameType } from './SenderName';
import { SentTime, SentTimeType } from './SentTime';
import { ReadIndicator, ReadIndicatorType } from './ReadIndicator';
import { Photo, PhotoType } from './Photo';

function getBubble(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === BubbleType);
}

function getPhoto(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === PhotoType);
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
  const filtered = childrenArray.filter((child) => isValidElement(child) && child.type === AvatarType);
  return filtered.length > 0 ? filtered : null;
}

function getReadIndicator(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === ReadIndicatorType);
}

interface ContainerProps {
  variant?: 'nego' | 'gray' | 'system';
  readTime?: Date | null;
  children?: ReactNode;
}

function Container({ variant, children }: ContainerProps) {
  const context = useMemo(() => ({ variant }), [variant]);

  const bubble = getBubble(children);
  const sentTime = getSentTime(children);
  const senderName = getSenderName(children);
  const avatar = getAvatar(children);
  const readIndicator = getReadIndicator(children);
  const photo = getPhoto(children);

  return (
    <ChatMessageContext.Provider value={context}>
      <div tw="flex items-start w-full gap-3">
        {avatar || (variant !== 'system' && <div tw="w-8" />)}
        <div tw="flex flex-1 flex-col gap-1.5">
          {senderName}
          <div
            css={[
              tw`flex items-end gap-1`,
              variant === 'nego' && tw`flex-row-reverse`,
              variant === 'system' && tw`justify-center`,
            ]}
          >
            {photo && <div css={[tw`flex flex-col gap-2`, variant === 'nego' && tw`items-end`]}>{photo}</div>}
            <div css={[tw`flex flex-col gap-2`, variant === 'nego' && tw`items-end`]}>{bubble}</div>
            {variant !== 'system' && (
              <div css={[tw`flex flex-col w-12 shrink-0`, variant === 'nego' && tw`text-end`]}>
                {readIndicator}
                {sentTime}
              </div>
            )}
          </div>
        </div>
      </div>
    </ChatMessageContext.Provider>
  );
}

export default Object.assign(Container, { Avatar, Bubble, Photo, SentTime, SenderName, ReadIndicator });
