import { useRouter as useNextRouter } from 'next/router';
import { toast } from 'react-toastify';
import { usePlatform } from '@/providers/PlatformProvider';
import { useRouter } from '@/hooks/utils';
import { notIntersted } from '@/apis/suggest/notInterested';
import { acceptRecommend } from '@/apis/suggest/acceptRecommend';
import { deleteSuggestRecommend } from '@/apis/suggest/deleteSuggestRecommend';
import Routes from '@/router/routes';
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

  const onClickChat = (id: number) => {
    if (platform?.platform === 'pc') {
      router.replace(Routes.ChatRoom, {
        searchParams: {
          ...(router.query.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          chatRoomID: `${id}`,
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

  const onClickRecommendAccept = async (suggestRecommendId: number) => {
    await acceptRecommend(suggestRecommendId);
    await value?.mutate();
  };

  return { onClickNotInterested, onClickChat, onClickDeleteSuggestRecommendItem, onClickRecommendAccept };
}
