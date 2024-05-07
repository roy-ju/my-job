import { useMemo } from 'react';

import useSWR from 'swr';

import useAuth from '@/hooks/services/useAuth';

import { TransactionReviewResponse } from './types';

export default function useFetchTransactionReview(id: number, hasReview: boolean = false) {
  const { user } = useAuth();

  const { data, isLoading, mutate } = useSWR<TransactionReviewResponse>(
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
