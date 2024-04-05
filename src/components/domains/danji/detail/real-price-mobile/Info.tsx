import React from 'react';

import dynamic from 'next/dynamic';

import { Container, Title, TitleWrraper } from './widget/InfoWidget';

import { CommonDanjiDetailProps } from '../types';

const InfoHeader = dynamic(import('./InfoHeader'), { ssr: false });

const InfoDetail = dynamic(import('./InfoDetail'), { ssr: false });

interface InfoProps extends CommonDanjiDetailProps {
  buyOrRent?: number;
  selectedYear?: number;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}

export default function Info({ danji, buyOrRent, selectedYear, onChangeBuyOrRent, onChangeSelectedYear }: InfoProps) {
  return (
    <Container>
      <TitleWrraper>
        <Title>단지 실거래 분석</Title>
      </TitleWrraper>
      <InfoHeader
        danjiId={danji.danji_id}
        buyOrRent={buyOrRent}
        selectedYear={selectedYear}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
      />
      <InfoDetail danji={danji} buyOrRent={buyOrRent ?? 0} selectedYear={selectedYear ?? 0} />
    </Container>
  );
}
