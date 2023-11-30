import { Button } from '@/components/atoms';
import { SuggestRecommendDetailList } from '@/apis/suggest/getMySuggestRecommends';
import { useRouter as useNextRouter } from 'next/router';
import useSuggestListItemCTAHandler from '../../hooks/useSuggestListItemCTAHandler';

interface Props {
  item: SuggestRecommendDetailList;
}

export default function ListItemCtas({ item }: Props) {
  const { onClickChat, onClickRecommendAccept, onClickReopenChat, onClickMySuggestComplete } =
    useSuggestListItemCTAHandler();
  const params = useNextRouter().query;
  const suggestID = Number(params.suggestID);
  const isChatRoomDeleted = item.chat_room_id && item.chat_room_is_deleted;

  if (item.suggest_recommend_ever_user_accepted === false && item.suggest_recommend_has_sent === true) {
    return (
      <Button
        variant="primary"
        disabled={item.recommender_deregistered}
        onClick={() =>
          onClickRecommendAccept?.({
            suggest_id: suggestID,
            recommender_id: item.recommender_id,
            recommender_is_agent: item.is_agent,
          })
        }
        tw="w-full whitespace-nowrap"
      >
        네고 협의 시작하기
      </Button>
    );
  }

  if (item.suggest_recommend_ever_user_accepted === true) {
    return (
      <div tw="flex gap-2">
        <Button
          disabled={item.recommender_deregistered || item.agent_has_suggest_complete_completed}
          variant="primary"
          onClick={() => {
            onClickMySuggestComplete({
              suggest_id: suggestID,
              recommender_id: item.recommender_id,
              is_recommender_agent: item.is_agent,
            });
          }}
          tw="flex-1"
        >
          거래 성사 선언
        </Button>
        <Button
          variant={isChatRoomDeleted ? 'gray' : 'outlined'}
          onClick={() => {
            if (item.chat_room_id === null) return;
            if (item.chat_room_is_deleted) {
              onClickReopenChat(item.chat_room_id);
              return;
            }
            onClickChat(item.chat_room_id);
          }}
          tw="flex-1"
        >
          {isChatRoomDeleted ? '채팅 복원하기' : '채팅 바로가기'}
        </Button>
      </div>
    );
  }

  return null;
}
