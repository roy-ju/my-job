import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import reopneChatRoom from '@/apis/chat/reopenChatRoom';

import { apiService } from '@/services';

import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useSuggestListItemCTAHandler({ depth }: { depth?: number }) {
  const { platform } = useCheckPlatform();

  const value = useMySuggestDetailStore();

  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const onClickNotInterested = async (suggestRecommendId: number) => {
    await apiService.mySuggestRecommendNotIntersted({ id: suggestRecommendId });
    await value?.mutate();

    toast.success('추천받은 매물을 삭제했습니다.');
  };

  const onClickReopenChat = async (chatRoomID: number) => {
    await reopneChatRoom(chatRoomID);
    value?.mutate();
  };

  const onClickChat = (id: number) => {
    if (platform === 'pc') {
      customRouter.replace(Routes.ChatRoom, {
        searchParams: {
          ...(customRouter.query.danjiID ? { danjiID: customRouter.query.danjiID as string } : {}),
          chatRoomID: `${id}`,
          back: customRouter.asPath,
        },
      });
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
    }
  };

  const onClickDeleteSuggestRecommendItem = async (suggestRecommendID: number) => {
    await apiService.suggestRecommendDelete({ suggestRecommendID });
    await value?.mutate();
    toast.success('추천이 삭제되었습니다.');
  };

  const onClickRecommendAccept = async (request: {
    suggest_id: number;
    recommender_id: number;
    is_recommender_agent: boolean;
  }) => {
    await apiService.mySuggestRecommendAccept(request);
    await value?.mutate();
  };

  const onClickMySuggestComplete = async (req: {
    suggest_id: number;
    recommender_id: number;
    is_recommender_agent: boolean;
  }) => {
    await apiService.mySuggestSuggestorComplete(req);
    toast.success('거래가 성사되었습니다.');
  };

  return {
    onClickNotInterested,
    onClickChat,
    onClickDeleteSuggestRecommendItem,
    onClickRecommendAccept,
    onClickReopenChat,
    onClickMySuggestComplete,
  };
}
