import useAuth from '@/hooks/services/useAuth';
import { useMemo } from 'react';
import useSWR from 'swr';

interface GetTransactionReviewResponse {
  listing_contract_id: number;
  rating_text: string;
  recommendations: string;
  free_feedback: string;
}

export default function useAPI_GetTransactionReview(id: number, hasReview: boolean = false) {
  const { user } = useAuth();
  const { data, isLoading, mutate } = useSWR<GetTransactionReviewResponse>(
    user && hasReview ? ['/review/get', { listing_contract_id: id }] : null,
  );

  const review = useMemo(
    () =>
      data
        ? {
            listingContractId: data.listing_contract_id,
            ratingText: data.rating_text,
            recommendations: data.recommendations,
            freeFeedback: data.free_feedback,
          }
        : undefined,
    [data],
  );
  return { data: review, isLoading, mutate };
}
