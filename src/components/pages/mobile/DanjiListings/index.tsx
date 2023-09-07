import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { MobileContainer } from '@/components/atoms';
import { MobDanjiListings } from '@/components/templates';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

export default function DanjiListings() {
  const router = useRouter();

  const { danji } = useDanjiDetail();

  const [dropDownValue, setDropDownValue] = useState('최신순');

  const { totalCount, data, increamentPageNumber } = useAPI_GetDanjiListingsList({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    realestateType: danji?.type,
    orderBy: dropDownValue === '최신순' ? 1 : 2,
    pageSize: 10,
  });

  const handleBackButton = () => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  };

  const handleChangeDropDown = (value: string) => {
    setDropDownValue(value);
  };

  return (
    <MobileContainer>
      <MobDanjiListings
        totalCount={totalCount}
        danji={danji}
        data={data}
        dropDownValue={dropDownValue}
        onNext={increamentPageNumber}
        handleBackButton={handleBackButton}
        handleChangeDropDown={handleChangeDropDown}
      />
    </MobileContainer>
  );
}
