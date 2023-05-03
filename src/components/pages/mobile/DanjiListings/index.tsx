import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { MobileContainer } from '@/components/atoms';
import { MobDanjiListings } from '@/components/templates';
import { useRouter } from 'next/router';
import React from 'react';

export default function DanjiListings() {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  const { data, increamentPageNumber } = useAPI_GetDanjiListingsList({
    pnu: router?.query?.p ? (router.query.p as string) : undefined,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
    pageSize: 10,
  });

  return (
    <MobileContainer>
      <MobDanjiListings data={data} onNext={increamentPageNumber} handleBackButton={handleBackButton} />
    </MobileContainer>
  );
}
