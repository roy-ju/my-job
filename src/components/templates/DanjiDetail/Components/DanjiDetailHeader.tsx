import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { NavigationHeader } from '@/components/molecules';
import React from 'react';
import tw from 'twin.macro';

import ShareIcon from '@/assets/icons/share.svg';
import HeartFilledIcon from '@/assets/icons/heart.svg';
import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';

export default function DanjiDetailHeader({
  isHeaderActive,
  danji,
}: {
  isHeaderActive: boolean;
  danji?: GetDanjiDetailResponse;
}) {
  if (!danji) return null;

  return (
    <NavigationHeader
      id="negocio-header"
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
        <NavigationHeader.Button>
          {danji?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
        </NavigationHeader.Button>
      </div>
    </NavigationHeader>
  );
}
