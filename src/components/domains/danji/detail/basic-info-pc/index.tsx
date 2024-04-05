import { memo } from 'react';

import tw, { styled } from 'twin.macro';

import { Separator } from '@/components/atoms';

import { MarginTopSixteen } from '@/components/atoms/Margin';

import Info from '../basic-info-mobile/Info';

import { CommonDanjiDetailProps } from '../types';

const Container = styled.div`
  ${tw`px-5 pt-10 pb-10`}
`;

const Title = styled.span`
  ${tw`text-subhead_03 [line-height: 1]`}
`;

function BasicInfo({ danji }: CommonDanjiDetailProps) {
  return (
    <>
      <Separator tw="w-full [min-height: 8px]" />
      <Container>
        <Title>단지 기본정보</Title>
        <MarginTopSixteen />
        <Info danji={danji} />
      </Container>
    </>
  );
}

export default memo(BasicInfo);
