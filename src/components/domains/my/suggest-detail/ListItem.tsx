import { SuggestRecommendDetailList } from '@/services/my/types';

import SuccessIcon from '@/assets/icons/success.svg';

import CancelIcon from '@/assets/icons/cancel.svg';

import ListItemListingSection from './ListItemListingSection';

import ListItemTitleSection from './ListItemTitleSection';

import ListItemCtas from './ListItemCtas';

type ListItemProps = {
  item: SuggestRecommendDetailList;
  depth?: number;
};

export default function ListItem({ item, depth }: ListItemProps) {
  const isExistedList = item?.suggest_recommend_detail_list && item.suggest_recommend_detail_list.length > 0;

  const renderChatRoomClosedText = () => {
    if (item?.chat_room_id && item.suggest_recommend_ever_user_accepted && item.chat_room_is_deleted) {
      return (
        <p tw="text-caption_01 text-gray-700 text-center">
          이미 채팅방을 나간 요청 건입니다.
          <br />
          이전 채팅 내용을 확인하고 싶다면 &apos;채팅 복원하기&apos; 를 진행해주세요.
        </p>
      );
    }
  };

  return (
    <div tw="p-4 rounded-lg border border-gray-300 flex flex-col gap-4">
      <ListItemTitleSection item={item} />
      {item?.agent_has_suggest_complete_completed && (
        <div tw="flex gap-1 items-center text-info text-green-800 font-bold">
          <SuccessIcon />
          <p>거래성사가 완료되었습니다.</p>
        </div>
      )}
      {item.agent_has_suggest_complete_cancelled && (
        <div tw="flex gap-1 items-center text-info text-gray-700 font-bold">
          <CancelIcon />
          <p>거래 성사가 취소되었습니다.</p>
        </div>
      )}
      <ListItemCtas item={item} depth={depth} />
      {isExistedList && renderChatRoomClosedText()}
      {isExistedList &&
        item.suggest_recommend_detail_list.map((data) => (
          <ListItemListingSection key={data.suggest_recommend_id} item={data} depth={depth} />
        ))}
      {!isExistedList && <p tw="text-info text-gray-700 text-center">유효한 추천이 없습니다.</p>}
    </div>
  );
}
