import { useRouter } from 'next/router';

import useAuth from '@/hooks/services/useAuth';
import useFetchLawQnaList from '@/services/law-qna/useFetchLawQnaList';
import { useCallback } from 'react';

type LawQnaProps = {
  depth?: number;
};

export default function Lawqna({ depth }: LawQnaProps) {
  const { user } = useAuth();

  const router = useRouter();

  const {
    data: qnaLawData,
    mutate: mutateQnaData,
    incrementalPageNumber,
  } = useFetchLawQnaList({ searchQuery: router?.query?.q ? (router.query.q as string) : null });

  const handleClickHome = useCallback(() => {
    router.replace('');
  }, [router]);

  return <div>Lawqna</div>;
}
