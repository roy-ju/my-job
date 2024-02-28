import { useCallback, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import tw from 'twin.macro';

import { mutate } from 'swr';

import { toast } from 'react-toastify';

import { NavigationHeader, OverlayPresenter } from '@/components/molecules';

import { SharePopup } from '@/components/organisms';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import axios from '@/lib/axios';

import useAuth from '@/hooks/services/useAuth';

import { useRouter } from '@/hooks/utils';

import kakaoShare from '@/utils/kakaoShare';

import Actions from '@/constants/actions';

import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';

import { danjiFavoriteAdd, danjiFavoriteRemove } from '@/apis/danji/danjiFavorite';

import Paths from '@/constants/paths';

import ShareIcon from '@/assets/icons/share.svg';

import HeartFilledIcon from '@/assets/icons/heart.svg';

import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';

export default function DanjiDetailHeader({
  isHeaderActive,
  danji,
}: {
  isHeaderActive: boolean;
  danji?: GetDanjiDetailResponse;
  handleMutateDanji?: () => void;
}) {
  const router = useRouter(1);

  const nextRouter = useNextRouter();

  const [popup, setPopup] = useState(false);

  const { user, isLoading: isAuthLoading } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const onClickFavorite = useCallback(async () => {
    if (!danji || isAuthLoading) return;

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
        await danjiFavoriteAdd({
          danji_id: danji.danji_id,
        });
        const { data: updatedData } = await axios.post('/danji/detail', { danji_id: danji?.danji_id });
        return updatedData;
      }
    }

    async function danjiFavoriteRemoveOptimistic() {
      if (danji) {
        await danjiFavoriteRemove({
          danji_id: danji.danji_id,
        });
        const { data: updatedData } = await axios.post('/danji/detail', { danji_id: danji?.danji_id });
        return updatedData;
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
  }, [danji, isAuthLoading, user, openAuthPopup, handleUpdateReturnUrl]);

  const handleClickShare = useCallback(() => setPopup(true), []);

  const handleShareViaKakao = useCallback(() => {
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
  }, [danji]);

  const handleCopyUrl = useCallback(() => {
    if (!danji) return;

    const content = `[네고시오] ${danji?.name}\n► ${danji?.road_name_address ?? danji?.jibun_address}\n\n${
      window.origin
    }/danjiDetail?danjiID=${danji.danji_id}`;

    navigator.clipboard.writeText(content);
    toast.success('복사되었습니다.');
    setPopup(false);
  }, [danji]);

  if (!danji) return null;

  return (
    <>
      <NavigationHeader
        id="negocio-header"
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        {router.query.back ? (
          <NavigationHeader.BackButton
            isHeaderActive={!isHeaderActive}
            onClick={() => nextRouter.replace(router.query.back as string)}
          />
        ) : null}
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
