import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';
import { Loading, MobileContainer } from '@/components/atoms';
import { SuggestDetail } from '@/components/templates';

import { useRouter } from 'next/router';
import { memo } from 'react';

export default memo(() => {
  const router = useRouter();

  const suggestID = router?.query?.suggestID ? Number(router.query.suggestID) : undefined;

  const { data, isLoading } = useAPI_GetSuggestDetail(suggestID);

  const handleClickBack = () => {
    router.back();
  };

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
      <SuggestDetail data={data} onClickBack={handleClickBack} />
    </MobileContainer>
  );
});
