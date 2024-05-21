import React from 'react';

import { Button } from '@/components/atoms';

import NaverLogo from '@/assets/icons/naver_logo.svg';

import { useFetchNaverDanji } from '@/services/danji/useFetchNaverDanji';

import { NaverDanjiResponse } from '@/services/danji/types';

type NaverRealestateButtonProps = {
  danjiID: number;
  naverDanji?: NaverDanjiResponse;
};

export default function NaverRealestateButton({ danjiID, naverDanji }: NaverRealestateButtonProps) {
  const { data: naverDanjiData } = useFetchNaverDanji({ id: danjiID, prefetchedData: naverDanji });

  const renderCondition = !!naverDanji?.outlink_pc;

  const handleClickNaverRealestateButton = () => {
    if (naverDanjiData?.outlink_mobile) {
      window.open(naverDanjiData.outlink_pc);
    }
  };

  if (!renderCondition) return null;

  return (
    <Button variant="outlined" tw="w-full" size="medium" onClick={handleClickNaverRealestateButton}>
      <NaverLogo style={{ marginRight: '4px' }} />
      네이버 호가 확인하기
    </Button>
  );
}
