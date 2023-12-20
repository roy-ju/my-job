import React from 'react';

import { Button } from '@/components/atoms';

import NaverLogo from '@/assets/icons/naver_logo.svg';

import useDanjiSuggestsOrListingsStore from '../../hooks/useDanjiSuggestsOrListingsStore';

import useDanjiActiveListingsOrSuggestsHandler from '../../hooks/useDanjiActiveListingsOrSuggestsHandler';

export default function NaverMapButton() {
  const store = useDanjiSuggestsOrListingsStore();

  const { handleRouterOpenNaverRealestate } = useDanjiActiveListingsOrSuggestsHandler();

  const handleClickNaverRealestateButton = () => {
    handleRouterOpenNaverRealestate(store?.naverMap?.mobileNaverURL);
  };

  const renderCondition = !!store?.naverMap?.mobileNaverURL;

  if (!renderCondition) return null;

  return (
    <Button variant="outlined" tw="w-full" size="medium" onClick={handleClickNaverRealestateButton}>
      <NaverLogo style={{ marginRight: '4px' }} />
      네이버 호가 확인하기
    </Button>
  );
}
