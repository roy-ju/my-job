import { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useAuth from '@/hooks/services/useAuth';

import kakaoShare from '@/utils/kakaoShare';

import Actions from '@/constants/actions';

import Paths from '@/constants/paths';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import { DanjiDetailResponse } from '@/services/danji/types';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useHeaderHandler({ danji }: { danji: DanjiDetailResponse }) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const [popup, setPopup] = useState(false);

  const { user, isLoading: isAuthLoading } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const isRenderBackButton = useMemo(() => platform !== 'pc', [platform]);

  const handleClickBack = () => {
    if (platform === 'pc') return;

    const canGoBack = window.history.length > 1;

    if (canGoBack) {
      router.back();
    } else {
      router.replace(platform === 'pc' ? `/` : `/${Routes.EntryMobile}`);
    }
  };

  const handleClosePopup = useCallback(() => {
    setPopup(false);
  }, []);

  const handleClickFavorite = async () => {
    if (!danji || isAuthLoading) return;

    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!user) {
      openAuthPopup('onlyLogin');
      handleUpdateReturnUrl();

      if (typeof window !== 'undefined' && danji?.danji_id) {
        const id = danji.danji_id.toString() as string;
        window.sessionStorage.setItem(Actions.Danji_Favorite.key, id);
      }

      return;
    }

    async function danjiFavoriteAddOptimistic() {
      if (danji) {
        const id = danji.danji_id;

        await apiService.addDanjiFavorite({
          id,
        });

        const response = await apiService.getDanjiDetail({ id });

        return response;
      }
    }

    async function danjiFavoriteRemoveOptimistic() {
      if (danji) {
        const id = danji.danji_id;
        await apiService.removeDanjiFavorite({
          id,
        });

        const response = await apiService.getDanjiDetail({ id });

        return response;
      }
    }

    if (user && danji) {
      if (!danji.is_favorite) {
        await mutate(['/danji/detail', { danji_id: danji.danji_id }], danjiFavoriteAddOptimistic, {
          optimisticData: { ...danji, is_favorite: true },
          rollbackOnError: true,
        });

        toast.success('관심단지로 추가되었습니다.', { toastId: 'toast-danji-favorite' });
      } else {
        await mutate(['/danji/detail', { danji_id: danji.danji_id }], danjiFavoriteRemoveOptimistic, {
          optimisticData: { ...danji, is_favorite: false },
          rollbackOnError: true,
        });

        toast.success('관심단지가 해제되었습니다.', { toastId: 'toast-danji-delete-favorite' });
      }
    }
  };

  const handleClickShare = () => {
    setPopup(true);
  };

  const handleShareViaKakao = () => {
    if (!danji) return;

    const link = `${window.origin}/danji/${danji.danji_id}`;

    kakaoShare({
      width: 1200,
      height: 630,
      objectType: 'feed',
      title: danji?.name ?? '',
      description: danji?.road_name_address ?? danji?.jibun_address ?? '',
      imgUrl: Paths.DEFAULT_OPEN_GRAPH_IMAGE_3,
      link,
      buttonTitle: '자세히 보기',
    });

    setPopup(false);
  };

  const handleCopyUrl = () => {
    if (!danji) return;

    const content = `[네고시오] ${danji?.name}\n► ${danji?.road_name_address ?? danji?.jibun_address}\n\n${
      window.origin
    }/danji/${danji.danji_id}`;

    navigator.clipboard.writeText(content);

    toast.success('복사되었습니다.');

    setPopup(false);
  };

  return {
    isRenderBackButton,
    popup,
    handleClosePopup,
    handleClickBack,
    handleClickFavorite,
    handleClickShare,
    handleCopyUrl,
    handleShareViaKakao,
  };
}
