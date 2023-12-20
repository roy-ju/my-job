import { memo } from 'react';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import { DanjiDetailProvider } from './provider';

import DanjiDetail from './template';

export default memo(({ prefetchedData }: { prefetchedData?: { [key: string]: any } | null }) => {
  const { isLoading } = useFetchDanjiDetail({ preFetchedData: prefetchedData });

  if (isLoading) return null;

  return (
    <DanjiDetailProvider>
      <DanjiDetail />
    </DanjiDetailProvider>
  );
});
