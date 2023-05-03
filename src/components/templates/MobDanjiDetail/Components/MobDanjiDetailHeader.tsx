import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { NavigationHeader } from '@/components/molecules';
import React, { useCallback, useState } from 'react';
import tw from 'twin.macro';

import ShareIcon from '@/assets/icons/share.svg';
import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import { danjiFavoriteAdd, danjiFavoriteRemove } from '@/apis/danji/danjiFavorite';
import { useAuth } from '@/hooks/services';
import { toast } from 'react-toastify';

export default function MobDanjiDetailHeader({
  danji,
  isHeaderActive,
  onClickBack,
  handleMutateDanji,
}: {
  danji?: GetDanjiDetailResponse;
  isHeaderActive: boolean;
  onClickBack: () => void;
  handleMutateDanji?: () => void;
}) {
  const [isFavorite, setIsFavorite] = useState(!!danji?.is_favorite);

  const { user, isLoading: isAuthLoading } = useAuth();

  const onClickFavorite = useCallback(async () => {
    if (!danji || isAuthLoading) return;

    if (!user) {
      toast.error('로그인이 필요해요. (임시)', { toastId: 'toast-danji-favorite' });
    }

    if (user) {
      if (!isFavorite) {
        await danjiFavoriteAdd({
          pnu: danji.pnu,
          realestate_type: danji.type,
        });
        toast.success('관심단지로 추가되었습니다.', { toastId: 'toast-danji-favorite' });
        setIsFavorite(true);

        if (handleMutateDanji) {
          handleMutateDanji();
        }
      } else {
        await danjiFavoriteRemove({
          pnu: danji.pnu,
          realestate_type: danji.type,
        });
        toast.success('관심단지가 해제되었습니다.', { toastId: 'toast-danji-favorite' });
        setIsFavorite(false);

        if (handleMutateDanji) {
          handleMutateDanji();
        }
      }
    }
  }, [danji, isAuthLoading, user, isFavorite, handleMutateDanji]);

  if (!danji) return null;

  return (
    <NavigationHeader
      id="negocio-header"
      css={[
        tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
        isHeaderActive && tw`bg-white text-gray-1000`,
      ]}
    >
      <NavigationHeader.BackButton onClick={onClickBack} />
      <NavigationHeader.Title tw="text-inherit">{danji.name}</NavigationHeader.Title>
      <div tw="flex gap-4">
        <NavigationHeader.Button>
          <ShareIcon tw="text-inherit" />
        </NavigationHeader.Button>
        <NavigationHeader.Button onClick={onClickFavorite}>
          {danji?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
        </NavigationHeader.Button>
      </div>
    </NavigationHeader>
  );
}
