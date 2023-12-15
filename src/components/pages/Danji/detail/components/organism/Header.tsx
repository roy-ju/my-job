import React, { useCallback } from 'react';

import tw from 'twin.macro';

import { NavigationHeader, OverlayPresenter } from '@/components/molecules';

import ShareIcon from '@/assets/icons/share.svg';

import HeartFilledIcon from '@/assets/icons/heart.svg';

import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';

import { SharePopup } from '@/components/organisms';

import { useAuth } from '@/hooks/services';

import { usePopupDisaptchStore, usePopupStore } from '@/providers/PopupProvider';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import useDanjiFavorite from '../../hooks/useDanjiFavoriteHandler';

import useDanjiShareHandler from '../../hooks/useDanjiShareHandler';

export default function Header({ isHeaderActive }: { isHeaderActive: boolean }) {
  const store = useDanjiDetailStore();

  const popup = usePopupStore();

  const popupDispatch = usePopupDisaptchStore();

  const { user, isLoading } = useAuth();

  const { onClickFavorite } = useDanjiFavorite();

  const { onClickShare, setCopyUrl } = useDanjiShareHandler();

  const onClickBack = () => {};

  const handleOpenSharePopup = useCallback(() => {
    popupDispatch?.('danjiShared');
  }, [popupDispatch]);

  const handleCloseSharePopup = useCallback(() => {
    popupDispatch?.('');
  }, [popupDispatch]);

  if (!store?.danji) return null;

  const { danji } = store;

  const { name, is_favorite } = danji;

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

      {popup && (
        <OverlayPresenter>
          <SharePopup
            onClickOutside={handleCloseSharePopup}
            onClickShareViaKakao={() => onClickShare(store?.danji, handleCloseSharePopup)}
            onClickCopyUrl={() => setCopyUrl(store?.danji, handleCloseSharePopup)}
          />
        </OverlayPresenter>
      )}
    </>
  );
}
