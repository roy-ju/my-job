import { MobileContainer } from '@/components/atoms';
import { MobDanjiDetail } from '@/components/templates';
import React from 'react';
import useDanjiDetail from './useDanjiDetail';

const DanjiDetail = () => {
  const { danji, mutate } = useDanjiDetail();

  const handleMutateDanji = () => {
    mutate();
  };

  return (
    <MobileContainer>
      <MobDanjiDetail danji={danji} handleMutateDanji={handleMutateDanji} isShowTab />
    </MobileContainer>
  );
};

export default DanjiDetail;
