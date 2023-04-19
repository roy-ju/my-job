/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiPhotosResponse } from '@/apis/danji/danjiPhotos';
import { NavigationHeader } from '@/components/molecules';
import tw from 'twin.macro';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';
import HeartIcon from '@/assets/icons/heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import { useScroll } from '@/hooks/utils';
import { useCallback, useRef, useState } from 'react';
import Apartment from '@/../public/static/images/apartment_default.png';

import Image from 'next/image';
import { useAuth } from '@/hooks/services';
import { toast } from 'react-toastify';
import { danjiFavoriteAdd, danjiFavoriteRemove } from '@/apis/danji/danjiFavorite';
import PhotoHero from '../PhotoHero';

export function DanjiHeader({
  danji,
  danjiPhotos,
  isShowDanjiPhotos,
}: {
  danji?: GetDanjiDetailResponse;
  danjiPhotos?: GetDanjiPhotosResponse;
  isShowDanjiPhotos?: boolean;
}) {
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const [isFavorite, setIsFavorite] = useState(!!danji?.is_favorite);

  const { user, isLoading: isAuthLoading } = useAuth();

  useScroll(scrollContainer, ({ scrollY }) => {
    setIsHeaderActive(scrollY > 0.1);
  });

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
      } else {
        await danjiFavoriteRemove({
          pnu: danji.pnu,
          realestate_type: danji.type,
        });
        toast.success('관심단지가 해제되었습니다.', { toastId: 'toast-danji-favorite' });
        setIsFavorite(false);
      }
    }
  }, [danji, isAuthLoading, user, isFavorite]);

  if (!danji) return null;

  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        <NavigationHeader.Title tw="text-inherit">{danji.name}</NavigationHeader.Title>
        <div tw="flex gap-4">
          <NavigationHeader.Button>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>
          {isFavorite ? (
            <NavigationHeader.Button onClick={onClickFavorite}>
              <HeartIcon tw="text-inherit" />
            </NavigationHeader.Button>
          ) : (
            <NavigationHeader.Button onClick={onClickFavorite}>
              <HeartOutlinedIcon tw="text-inherit" />
            </NavigationHeader.Button>
          )}
        </div>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto" ref={scrollContainer}>
        {danjiPhotos?.danji_photos && danjiPhotos.danji_photos.length > 0 ? (
          <PhotoHero
            itemSize={danjiPhotos.danji_photos.length ?? 0}
            photoPath={danjiPhotos.danji_photos?.[0]?.full_file_path}
          />
        ) : (
          <Image
            width={380}
            height={256}
            alt="image"
            src={Apartment}
            style={{ objectFit: 'cover', width: '380px', height: '256px' }}
          />
        )}
      </div>
    </div>
  );
}
