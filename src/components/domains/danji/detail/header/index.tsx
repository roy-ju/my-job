import { memo } from 'react';

import dynamic from 'next/dynamic';

import tw from 'twin.macro';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import useHeaderHandler from './hooks/useHeaderHandler';

import { CommonDanjiDetailProps } from '../types';

const OverlayPresenter = dynamic(() => import('@/components/molecules/OverlayPresenter'), { ssr: false });

const SharePopup = dynamic(() => import('@/components/organisms/SharePopup'), { ssr: false });

const ShareIcon = dynamic(() => import('@/assets/icons/share.svg'), { ssr: false });

const HeartFilledIcon = dynamic(() => import('@/assets/icons/heart.svg'), { ssr: false });

const HeartOutlinedIcon = dynamic(() => import('@/assets/icons/heart_outlined.svg'), { ssr: false });

interface HeaderProps extends CommonDanjiDetailProps {
  isHeaderActive: boolean;
}

function Header({ danji, isHeaderActive }: HeaderProps) {
  const {
    isRenderBackButton,
    popup,
    handleClosePopup,
    handleClickBack,
    handleClickFavorite,
    handleClickShare,
    handleCopyUrl,
    handleShareViaKakao,
  } = useHeaderHandler({ danji });

  return (
    <>
      <NavigationHeader
        id="negocio-header"
        css={[
          tw`absolute top-0 left-0 z-50 w-full text-white transition-colors bg-transparent`,
          isHeaderActive && tw`bg-white text-gray-1000`,
        ]}
      >
        {isRenderBackButton && (
          <NavigationHeader.BackButton isHeaderActive={!isHeaderActive} onClick={handleClickBack} />
        )}

        <NavigationHeader.Title tw="text-inherit">
          <h1>{danji.name}</h1>
        </NavigationHeader.Title>

        <div tw="flex gap-4">
          <NavigationHeader.Button onClick={handleClickShare}>
            <ShareIcon tw="text-inherit" />
          </NavigationHeader.Button>
          <NavigationHeader.Button onClick={handleClickFavorite}>
            {danji?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
          </NavigationHeader.Button>
        </div>
      </NavigationHeader>

      {popup && (
        <OverlayPresenter>
          <SharePopup
            onClickOutside={handleClosePopup}
            onClickShareViaKakao={handleShareViaKakao}
            onClickCopyUrl={handleCopyUrl}
          />
        </OverlayPresenter>
      )}
    </>
  );
}

export default memo(Header);
