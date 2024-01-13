import useAuth from '@/hooks/services/useAuth';
import { useMemo } from 'react';
import useSWR from 'swr';

interface GetTransactionReviewInfoResponse {
  has_review: boolean;
  user_nickname: string;
  agent_name: string;
}

export default function useAPI_GetTransactionReviewInfo(id: number) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetTransactionReviewInfoResponse>(
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
