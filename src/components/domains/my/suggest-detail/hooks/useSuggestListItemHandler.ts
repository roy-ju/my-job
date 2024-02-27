import { useCallback } from 'react';

import { KeyedMutator } from 'swr';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import reopneChatRoom from '@/apis/chat/reopenChatRoom';

import { apiService } from '@/services';

import { MySuggestRecommendsResponse } from '@/services/my/types';

export default function useSuggestListItemHandler({
  mutate,
}: {
  mutate?: KeyedMutator<MySuggestRecommendsResponse[]>;
}) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const onClickNotInterested = useCallback(
    async (suggestRecommendId: number) => {
      await apiService.mySuggestRecommendNotIntersted({ id: suggestRecommendId });
      await mutate?.();

      toast.success('추천받은 매물을 삭제했습니다.');
    },
    [mutate],
  );

  const onClickReopenChat = useCallback(
    async (chatRoomID: number) => {
      await reopneChatRoom(chatRoomID);
      await mutate?.();
    },
    [mutate],
  );

  const onClickChat = useCallback(
    (id: number) => {
      if (platform === 'pc') {
        const depth1 = router?.query?.depth1 ?? '';
        const depth2 = router?.query?.depth2 ?? '';

        const query = router.query;

        delete query.depth1;
        delete query.depth2;

        if (depth1 && !depth2) {
          router.push({
            pathname: `/${Routes.ChatRoom}`,
            query: { ...query, chatRoomID: `${id}`, back: router.asPath },
          });
        } else if (depth1 && depth2) {
          router.push({
            pathname: `/${depth1}/${Routes.ChatRoom}`,
            query: { ...query, chatRoomID: `${id}`, back: router.asPath },
          });
        }
      } else {
        router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
      }
    },
    [platform, router],
  );

  const onClickDeleteSuggestRecommendItem = useCallback(
    async (suggestRecommendID: number) => {
      await apiService.suggestRecommendDelete({ suggestRecommendID });
      await mutate?.();
      toast.success('추천이 삭제되었습니다.');
    },
    [mutate],
  );

  const onClickMySuggestRecommendAccept = useCallback(
    async (request: { suggest_id: number; recommender_id: number; is_recommender_agent: boolean }) => {
      await apiService.mySuggestRecommendAccept(request);
      await mutate?.();
    },
    [mutate],
  );

  const onClickMySuggestorComplete = useCallback(
    async (req: { suggest_id: number; recommender_id: number; is_recommender_agent: boolean }) => {
      await apiService.mySuggestSuggestorComplete(req);
      toast.success('거래가 성사되었습니다.');
    },
    [],
  );

  return {
    onClickNotInterested,

    /** 채팅방 바로가기 */
    onClickChat,

    /** 채팅방 복원하기 */
    onClickReopenChat,

    onClickDeleteSuggestRecommendItem,

    /** 네고 협의 */
    onClickMySuggestRecommendAccept,

    /** 거래 성사 */
    onClickMySuggestorComplete,
  };
}
