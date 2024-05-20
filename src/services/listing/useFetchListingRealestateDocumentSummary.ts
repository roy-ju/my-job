import useSWR from 'swr';

import { ListingRealestateDocumenSummarytResponse } from './types';

export default function useFetchListingRealestateDocumentSummary(listingID: number) {
  const { data, isLoading } = useSWR<ListingRealestateDocumenSummarytResponse>(
    listingID
      ? [
          '/listing/realestatedocument/summary',
          {
            listing_id: listingID,
          },
        ]
      : null,
  );

  return {
    data,
    isLoading,
  };
}
