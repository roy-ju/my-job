import { memo, useState } from 'react';

import dynamic from 'next/dynamic';

import tw from 'twin.macro';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useAuth from '@/hooks/services/useAuth';

import { DanjiDetailResponse } from '@/services/danji/types';

import Paths from '@/constants/paths';

import { useRouter } from 'next/router';

import { apiService } from '@/services';

import Actions from '@/constants/actions';

import kakaoShare from '@/utils/kakaoShare';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import Routes from '@/router/routes';

const OverlayPresenter = dynamic(() => import('@/components/molecules/OverlayPresenter'), { ssr: false });

const SharePopup = dynamic(() => import('@/components/organisms/SharePopup'), { ssr: false });

const ShareIcon = dynamic(() => import('@/assets/icons/share.svg'), { ssr: false });

const HeartFilledIcon = dynamic(() => import('@/assets/icons/heart.svg'), { ssr: false });

const HeartOutlinedIcon = dynamic(() => import('@/assets/icons/heart_outlined.svg'), { ssr: false });

function Header({ danji, isHeaderActive }: { danji: DanjiDetailResponse; isHeaderActive: boolean }) {
  const router = useRouter();

  const handleClickBack = () => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}`);
      }
    }
  };

  const [popup, setPopup] = useState(false);

  const { user, isLoading: isAuthLoading } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const onClickFavorite = async () => {
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

    const link = `${window.origin}/danjiDetail?danjiID=${danji.danji_id}`;

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

  const handleCopyUrl = async () => {
    if (!danji) return;

    const content = `[네고시오] ${danji?.name}\n► ${danji?.road_name_address ?? danji?.jibun_address}\n\n${
      window.origin
    }/danjiDetail?danjiID=${danji.danji_id}`;

    navigator.clipboard.writeText(content);

    toast.success('복사되었습니다.');

    setPopup(false);
  };

  return (
    <>
      <NavigationHeader
        id="negocio-header"
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        <NavigationHeader.BackButton isHeaderActive={!isHeaderActive} onClick={handleClickBack} />
        <NavigationHeader.Title tw="text-inherit">
          <h1>{danji.name}</h1>
        </NavigationHeader.Title>
        <div tw="flex gap-4">
          <NavigationHeader.Button onClick={handleClickShare}>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>
          <NavigationHeader.Button onClick={onClickFavorite}>
            {danji?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
          </NavigationHeader.Button>
        </div>
      </NavigationHeader>
      {popup && (
        <OverlayPresenter>
          <SharePopup
            onClickOutside={() => setPopup(false)}
            onClickShareViaKakao={handleShareViaKakao}
            onClickCopyUrl={handleCopyUrl}
          />
        </OverlayPresenter>
      )}
    </>
  );
}

export default memo(Header);
