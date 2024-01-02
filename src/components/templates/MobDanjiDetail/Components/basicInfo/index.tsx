import { memo } from 'react';

import dynamic from 'next/dynamic';

import { Separator, Skeleton } from '@/components/atoms';

import { DanjiDetailResponse } from '@/services/danji/types';

import Info from './Info';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <Skeleton height="190px" />,
});

type BasicInfoProps = {
  danji: DanjiDetailResponse;
};

function BasicInfo({ danji }: BasicInfoProps) {
  return (
    <>
      <Separator tw="w-full [min-height: 8px]" />
      <div tw="px-5 pt-10 pb-10">
        <span tw="font-bold text-b1 [line-height: 1]">단지 기본정보</span>

        <div tw="[min-height: 16px]" />

        <Map danji={danji} />

        <div tw="[min-height: 16px]" />

        <Info danji={danji} />
      </div>
    </>
  );
}

export default memo(BasicInfo);
