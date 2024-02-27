import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { KeyedMutator } from 'swr';

import { ButtonV2 } from '@/components/atoms';

import { MySuggestRecommendsResponse, SuggestRecommendDetailList } from '@/services/my/types';

import ListItemTitleSection from './ListItemTitleSection';

import ListItemStatusMessage from './ListItemStatusMessage';

import ListItemCtas from './ListItemCtas';

import DeletedChatRoomMessage from './DeletedChatRoomMessage';

import ListItemListingSection from './ListItemListingSection';

import useSuggestListItemHandler from './hooks/useSuggestListItemHandler';

const StartNegotiationButton = styled(ButtonV2)`
  ${tw`absolute z-20 left-1/2 -translate-x-1/2 [width: 157px] top-1/2 -translate-y-1/2 opacity-100`}
`;

const DimmedLayer = styled.div`
  ${tw`absolute z-10 w-full bg-gray-300 rounded-lg`}

  background: linear-gradient(0deg, #ffffff 22%, rgba(255, 255, 255, 0.3) 100%);

  width: calc(100% - 2px);
  height: calc(100% - 2px);
  margin-left: 1px;
  margin-top: 1px;
`;

type ListItemProps = {
  item: SuggestRecommendDetailList;
  mutate: KeyedMutator<MySuggestRecommendsResponse[]>;
};

export default function ListItem({ item, mutate }: ListItemProps) {
  const { query } = useRouter();

  const { onClickMySuggestRecommendAccept } = useSuggestListItemHandler({ mutate });

  const isExistedList = useMemo(
    () => item?.suggest_recommend_detail_list && item?.suggest_recommend_detail_list.length > 0,
    [item],
  );

  const chatRoomDeleted = useMemo(
    () => item?.chat_room_id && item?.suggest_recommend_ever_user_accepted && item?.chat_room_is_deleted,
    [item],
  );

  const isListDimmed = item.is_agent && !item.suggest_recommend_ever_user_accepted && item.suggest_recommend_has_sent;

  const handleClickNegotiationStartButton = useCallback(() => {
    const suggestID = query.suggestID ? Number(query.suggestID) : 0;

    if (!suggestID) return;

    onClickMySuggestRecommendAccept({
      suggest_id: suggestID,
      recommender_id: item.recommender_id,
      is_recommender_agent: item.is_agent,
    });
  }, [item.is_agent, item.recommender_id, onClickMySuggestRecommendAccept, query.suggestID]);

  return (
    <div tw="relative">
      {isListDimmed && (
        <>
          <DimmedLayer />
          <StartNegotiationButton onClick={handleClickNegotiationStartButton}>확인하기</StartNegotiationButton>
        </>
      )}

      <div tw="p-4 rounded-lg border border-gray-300 flex flex-col gap-4">
        <ListItemTitleSection item={item} isListDimmed={isListDimmed} />
        {item?.agent_has_suggest_complete_completed && <ListItemStatusMessage status="success" />}
        {item?.agent_has_suggest_complete_cancelled && <ListItemStatusMessage status="cancel" />}
        <ListItemCtas item={item} mutate={mutate} />
        {isExistedList && chatRoomDeleted && <DeletedChatRoomMessage />}
        {isExistedList &&
          (isListDimmed ? item.suggest_recommend_detail_list.slice(0, 1) : item.suggest_recommend_detail_list).map(
            (data) => <ListItemListingSection key={data.suggest_recommend_id} item={data} mutate={mutate} />,
          )}
        {!isExistedList && <p tw="text-info text-gray-700 text-center">유효한 추천이 없습니다.</p>}
      </div>
    </div>
  );
}
