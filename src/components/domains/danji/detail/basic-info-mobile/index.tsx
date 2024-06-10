import { memo } from 'react';

import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import { Separator, Skeleton } from '@/components/atoms';

import { MarginTopSixteen } from '@/components/atoms/Margin';

import Info from './Info';

import { CommonDanjiDetailProps } from '../types';

const Container = styled.div`
  ${tw`px-5 pt-10 pb-10`}
`;

const Title = styled.span`
  ${tw`text-subhead_03 [line-height: 1]`}
`;

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <Skeleton height="190px" />,
});

function BasicInfo({ danji }: CommonDanjiDetailProps) {
  return (
    <>
      <Separator tw="w-full [min-height: 8px]" />
      <Container>
        <Title>단지 기본정보</Title>
        <MarginTopSixteen />
        <Map danji={danji} />
        <MarginTopSixteen />
        <Info danji={danji} />
      </Container>
    </>
  );
}

export default memo(BasicInfo);
