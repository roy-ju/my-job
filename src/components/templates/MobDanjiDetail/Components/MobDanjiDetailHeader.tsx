import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { NavigationHeader, OverlayPresenter } from '@/components/molecules';
import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';
import axios from '@/lib/axios';
import { mutate } from 'swr';
import ShareIcon from '@/assets/icons/share.svg';
import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import { danjiFavoriteAdd, danjiFavoriteRemove } from '@/apis/danji/danjiFavorite';
import { useAuth } from '@/hooks/services';
import { toast } from 'react-toastify';
import Paths from '@/constants/paths';
import { SharePopup } from '@/components/organisms';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';

export default function MobDanjiDetailHeader({
  danji,
  isHeaderActive,
  onClickBack,
}: {
  danji?: GetDanjiDetailResponse;
  isHeaderActive: boolean;
  onClickBack: () => void;
  handleMutateDanji?: () => void;
}) {
  const router = useRouter();

  const [popup, setPopup] = useState(false);

  const { user, isLoading: isAuthLoading } = useAuth();

  const onClickFavorite = useCallback(async () => {
    if (!danji || isAuthLoading) return;

    if (!user) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.Login}`,
        query: {
          redirect: router.asPath,
        },
      });
      return;
    }

    if (!user.isVerified) {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.VerifyCi}`,
        query: {
          redirect: router.asPath,
        },
      });
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
        toast.success('관심단지가 해제되었습니다.', { toastId: 'toast-danji-favorite' });
      }
    }
  }, [danji, isAuthLoading, user, router]);

  const handleClickShare = useCallback(() => setPopup(true), []);

  const handleShareViaKakao = useCallback(() => {
    if (!danji) return;

    const link = `${window.origin}/danjiDetail?danjiID=${danji.danji_id}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      installTalk: true,
      content: {
        title: danji?.name ?? '',
        description: danji?.road_name_address ?? danji?.jibun_address ?? '',
        imageUrl: Paths.DEFAULT_OPEN_GRAPH_IMAGE_3,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
        imageWidth: 1200,
        imageHeight: 630,
      },
      buttons: [
        {
          title: '자세히보기',
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
      ],
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
        <NavigationHeader.BackButton onClick={onClickBack} />
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
