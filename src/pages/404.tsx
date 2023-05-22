import { PageNotFound } from '@/components/templates';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function Error404() {
  const router = useRouter();

  const handleClickBack = useCallback(() => {
    router.replace('/');
  }, [router]);

  return <PageNotFound onClickBack={handleClickBack} />;
}
