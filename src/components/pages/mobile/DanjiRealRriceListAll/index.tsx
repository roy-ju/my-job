import { MobileContainer } from '@/components/atoms';
// import { MobDanjiRealPriceListAll } from '@/components/templates';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

const MobDanjiRealPriceListAll = dynamic(import('@/components/templates/MobDanjiRealPriceListAll'), {
  loading: () => <div />,
  ssr: false,
});

const DanjiRealPriceListAll = () => {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  const { danji } = useDanjiDetail();

  return (
    <MobileContainer>
      <MobDanjiRealPriceListAll danji={danji} onClickBack={onClickBack} />
    </MobileContainer>
  );
};

export default DanjiRealPriceListAll;
