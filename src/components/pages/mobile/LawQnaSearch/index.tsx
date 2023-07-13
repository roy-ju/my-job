import { MobileContainer } from '@/components/atoms';
import { LegalCounselingSearch } from '@/components/templates';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import React from 'react';

function LawQnaSearch() {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  const onSummit = (value: string) => {
    if (!value) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQna}`);
      return;
    }

    if (value) {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQna}?q=${value}`);
    }
  };

  return (
    <MobileContainer>
      <LegalCounselingSearch onClickBack={handleClickBack} onSubmit={onSummit} />
    </MobileContainer>
  );
}

export default LawQnaSearch;
