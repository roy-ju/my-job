import { useMemo } from 'react';

import tw, { styled } from 'twin.macro';

import { Avatar } from '@/components/atoms';

import defaultAvatar from '@/../public/static/images/default_avatar.png';

import { formatLastMessageTime } from '@/utils/formatsTime';

import { ChatRoomListItem as ChatRoomListItemType } from './types';

interface ListItemProps {
  item: ChatRoomListItemType;
  lastMessage: string;
  onClick?: () => void;
}

const Wrraper = styled.div``;

const ChatRoomListButton = styled.button`
  ${tw`flex items-center w-full h-20 px-5 transition-colors bg-white text-start`}
`;

const Flex = styled.div`
  ${tw`flex flex-1 min-w-0`}
`;

const ContentsWrraper = styled.div`
  ${tw`flex flex-col flex-1 min-w-0 gap-1 ml-3`}
`;

const TopContents = styled.div`
  ${tw`flex items-center justify-between gap-1`}
`;

const MiddleContents = styled.div`
  ${tw`flex items-center justify-between`}
`;

const LineClampDiv = styled.div`
  ${tw`flex items-center gap-1 overflow-hidden line-clamp-1`}
`;

const Name = styled.span`
  ${tw`text-subhead_02 text-gray-1000`}
`;

const LastMessageTime = styled.div`
  ${tw`self-end leading-5 text-gray-700 shrink-0 text-body_01`}
`;

const LastMessage = styled.div`
  ${tw`overflow-hidden text-body_02 text-ellipsis whitespace-nowrap`}
`;

const UnreadMessagesCountDiv = styled.div`
  ${tw`inline-flex items-center justify-center h-5 ml-3 text-white bg-red-800 text-body_01`}
`;

const UnreadMessageCount = styled.span`
  ${tw`min-w-[20px] text-center`}
`;

export default function ListItem({ item, lastMessage, onClick }: ListItemProps) {
  const { name, lastMessageTime, unreadMessageCount, profileImagePath, active } = item;

  const latestMessageTimeText = useMemo(() => formatLastMessageTime(lastMessageTime), [lastMessageTime]);

  const unreadRenderCodition = unreadMessageCount > 0 ? (unreadMessageCount > 9 ? '1' : '2') : '';

  const unreadMessageCountText = unreadMessageCount > 99 ? '99+' : unreadMessageCount;

  return (
    <Wrraper>
      <ChatRoomListButton css={[active ? tw`hover:bg-gray-100` : tw`[opacity: 0.4]`]} onClick={onClick}>
        <Flex>
          <Avatar size={44} alt={`${name} 프로필 사진`} src={profileImagePath || defaultAvatar} />
          <ContentsWrraper>
            <TopContents>
              <LineClampDiv>
                <Name>{name}</Name>
              </LineClampDiv>
              <LastMessageTime>{latestMessageTimeText}</LastMessageTime>
            </TopContents>
            <MiddleContents>
              <LastMessage>{lastMessage}</LastMessage>
              {unreadRenderCodition && (
                <UnreadMessagesCountDiv
                  css={[unreadRenderCodition === '1' ? tw`[border-radius: 100px]` : tw`[border-radius: 50%]`]}
                >
                  <UnreadMessageCount css={[unreadRenderCodition === '1' && tw`px-1.5`]}>
                    {unreadMessageCountText}
                  </UnreadMessageCount>
                </UnreadMessagesCountDiv>
              )}
            </MiddleContents>
          </ContentsWrraper>
        </Flex>
      </ChatRoomListButton>
    </Wrraper>
  );
}
