import { useRouter as useNextRouter } from 'next/router';
import { toast } from 'react-toastify';
import { usePlatform } from '@/providers/PlatformProvider';
import { useRouter } from '@/hooks/utils';
import { notIntersted } from '@/apis/suggest/notInterested';
import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import { deleteSuggestRecommend } from '@/apis/suggest/deleteSuggestRecommend';
import Routes from '@/router/routes';
import reopneChatRoom from '@/apis/chat/reopenChatRoom';
import completeMySuggest from '@/apis/my/completeMySuggest';
import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useSuggestListItemCTAHandler() {
  const platform = usePlatform();

  const value = useMySuggestDetailStore();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const onClickNotInterested = async (suggestRecommendId: number) => {
    await notIntersted(suggestRecommendId);
    await value?.mutate();

    toast.success('추천받은 매물을 삭제했습니다.');
  };

  const onClickReopenChat = async (chatRoomID: number) => {
    await reopneChatRoom(chatRoomID);
    value?.mutate();
  };

  const onClickChat = (id: number) => {
    if (platform?.platform === 'pc') {
      router.replace(Routes.ChatRoom, {
        searchParams: {
          ...(router.query.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          chatRoomID: `${id}`,
          back: router.asPath,
        },
      });
    } else {
      nextRouter.push(`/${Routes.EntryMobile}/${Routes.ChatRoom}?chatRoomID=${id}`);
    }
  };

  const onClickDeleteSuggestRecommendItem = async (suggestRecommendId: number) => {
    await deleteSuggestRecommend(suggestRecommendId);
    await value?.mutate();
  };

  const onClickRecommendAccept = async (request: {
    suggest_id: number;
    recommender_id: number;
    is_recommender_agent: boolean;
  }) => {
    await acceptRecommend(request);
    await value?.mutate();
  };

  const onClickMySuggestComplete = async (req: {
    suggest_id: number;
    recommender_id: number;
    is_recommender_agent: boolean;
  }) => {
    await completeMySuggest(req);
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
