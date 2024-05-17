import { useMemo } from 'react';

import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import { TransactionReviewParticipatorsInfoResponse } from './types';

export default function useFetchTransactionReviewParticipatorsInfo(id: number) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<TransactionReviewParticipatorsInfoResponse>(
    user ? ['/review/participators/info', { listing_contract_id: id }] : null,
  );

  const review = useMemo(
    () =>
      data
        ? {
            hasReview: data.has_review,
            userNickname: data.user_nickname,
            agentName: data.agent_name,
          }
        : undefined,
    [data],
  );
  return { data: review, isLoading, mutate };
}
