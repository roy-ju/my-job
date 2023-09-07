import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';
import { MobileContainer } from '@/components/atoms';
import { MobSuggestListings } from '@/components/templates';
import { useRouter } from 'next/router';

import { memo, useCallback } from 'react';
import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

export default memo(() => {
  const router = useRouter();

  const { danji } = useDanjiDetail();

  const { data, increamentPageNumber, totalCount } = useAPI_GetDanjiSuggestList({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : danji?.danji_id,
    pageSize: 10,
  });

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <MobileContainer>
      <MobSuggestListings
        danji={danji}
        data={data}
        totalCount={totalCount}
        onNext={increamentPageNumber}
        onClickBack={handleClickBack}
      />
    </MobileContainer>
  );
});
