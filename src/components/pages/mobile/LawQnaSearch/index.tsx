import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import LegalCounselingSearch from '@/components/templates/LegalCounselingSearch';

import Routes from '@/router/routes';
import { useCallback } from 'react';

function LawQnaSearch() {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.LawQna}`);
  }, [router]);

  const onSummit = useCallback(
    (value: string) => {
      if (!value) {
        router.push(`/${Routes.EntryMobile}/${Routes.LawQna}`);
        return;
      }

      if (value) {
        router.push(`/${Routes.EntryMobile}/${Routes.LawQna}?q=${value}`);
      }
    },
    [router],
  );

  return (
    <MobileContainer>
      <LegalCounselingSearch onClickBack={handleClickBack} onSubmit={onSummit} />
    </MobileContainer>
  );
}

export default LawQnaSearch;
