import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { KeyedMutator } from 'swr';

import { Button } from '@/components/atoms';

import { SuggestRecommendDetailList, MySuggestRecommendsResponse } from '@/services/my/types';

import useSuggestListItemHandler from './hooks/useSuggestListItemHandler';

interface Props {
  item: SuggestRecommendDetailList;
  mutate: KeyedMutator<MySuggestRecommendsResponse[]>;
}

export default function ListItemCtas({ item, mutate }: Props) {
  const { onClickMySuggestorComplete, onClickChat, onClickReopenChat } = useSuggestListItemHandler({ mutate });

  const { query } = useRouter();

  const suggestID = query.suggestID ? Number(query.suggestID) : 0;

  const isChatRoomDeleted = item.chat_room_id && item.chat_room_is_deleted;

  const chatRoomButtonTitle = isChatRoomDeleted ? '채팅 복원하기' : '채팅 바로가기';

  const handleClickChatRoomButton = useCallback(() => {
    if (item.chat_room_id === null) return;

    if (item.chat_room_is_deleted) {
      onClickReopenChat(item.chat_room_id);
      return;
    }

    onClickChat(item.chat_room_id);
  }, [item?.chat_room_id, item?.chat_room_is_deleted, onClickChat, onClickReopenChat]);

  const handleClickSuggestCompleteButton = useCallback(() => {
    onClickMySuggestorComplete({
      suggest_id: suggestID,
      recommender_id: item.recommender_id,
      is_recommender_agent: item.is_agent,
    });
  }, [item.is_agent, item.recommender_id, onClickMySuggestorComplete, suggestID]);

  if (item.suggest_recommend_ever_user_accepted && item.chat_room_id) {
    return (
      <div tw="flex gap-2">
        <Button
          disabled={item.recommender_deregistered || item.agent_has_suggest_complete_completed}
          variant="primary"
          onClick={handleClickSuggestCompleteButton}
          tw="flex-1"
        >
          거래 성사 선언
        </Button>
        <Button variant={isChatRoomDeleted ? 'gray' : 'outlined'} onClick={handleClickChatRoomButton} tw="flex-1">
          {chatRoomButtonTitle}
        </Button>
      </div>
    );
  }

  return null;
}
