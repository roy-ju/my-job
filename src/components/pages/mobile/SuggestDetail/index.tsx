import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { Loading, MobileContainer } from '@/components/atoms';
import { SuggestDetail } from '@/components/templates';

import { useRouter } from 'next/router';
import { memo, useMemo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter();

  const suggestID = router?.query?.suggestID ? Number(router.query.suggestID) : undefined;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const disabledCTA = useMemo(() => false, []);

  const isExistMySuggested = useMemo(() => false, []);

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleClickCTA = useCallback(() => {}, []);

  if (isLoading) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  if (!data) return null;

  return (
    <MobileContainer>
      <SuggestDetail
        data={data}
        isExistMySuggested={isExistMySuggested}
        disabledCTA={disabledCTA}
        onClickCTA={handleClickCTA}
        onClickBack={handleClickBack}
      />
    </MobileContainer>
  );
});
