import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { PageNotFound } from '@/components/templates';

export default function Error404() {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.replace('/');
  }, [router]);

  return <PageNotFound onClickBack={handleClickBack} />;
}
