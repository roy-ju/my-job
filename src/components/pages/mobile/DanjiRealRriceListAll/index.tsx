import React from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import { MobileContainer } from '@/components/atoms';

import useDanjiDetailMobile from '@/components/domains/danji/hooks/useDanjiDetailMobile';

const MobDanjiRealPriceListAll = dynamic(import('@/components/templates/MobDanjiRealPriceListAll'), {
  loading: () => <div />,
  ssr: false,
});

const DanjiRealPriceListAll = () => {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  const { danji } = useDanjiDetailMobile();

  return (
    <MobileContainer>
      <MobDanjiRealPriceListAll danji={danji} onClickBack={onClickBack} />
    </MobileContainer>
  );
};

export default DanjiRealPriceListAll;
