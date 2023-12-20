import React, { useCallback } from 'react';

import tw from 'twin.macro';

import { NavigationHeader } from '@/components/molecules';

import ShareIcon from '@/assets/icons/share.svg';

import HeartFilledIcon from '@/assets/icons/heart.svg';

import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';

import { useAuth } from '@/hooks/services';

import { usePopupDisaptchStore } from '@/providers/PopupProvider';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import useDanjiFavorite from '../../hooks/useDanjiFavoriteHandler';

function Header({ isHeaderActive }: { isHeaderActive: boolean }) {
  const store = useDanjiDetailStore();

  const popupDispatch = usePopupDisaptchStore();

  const { user, isLoading } = useAuth();

  const { onClickFavorite } = useDanjiFavorite();

  const onClickBack = () => {};

  const handleOpenSharePopup = useCallback(() => {
    popupDispatch?.('danjiShared');
  }, [popupDispatch]);

  if (!store?.danji) return null;

  const { danji } = store;

  const { name, is_favorite } = danji;

  return (
    <div tw="[z-index: 500]">
      <NavigationHeader
        id="negocio-header"
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title tw="text-inherit">
          <h1>{name}</h1>
        </NavigationHeader.Title>

        <div tw="flex gap-4">
          <NavigationHeader.Button onClick={handleOpenSharePopup}>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>

          <NavigationHeader.Button onClick={() => onClickFavorite(user, isLoading, danji)}>
            {is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
          </NavigationHeader.Button>
        </div>
      </NavigationHeader>
    </div>
  );
}

export default React.memo(Header);
