import { useAuth } from '@/hooks/services';
import { useMemo } from 'react';
import useSWR from 'swr';

interface GetTransactionReviewInfoResponse {
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
            userNickname: data.user_nickname,
            agentName: data.agent_name,
          }
        : undefined,
    [data],
  );
  return { data: review, isLoading, mutate };
}
