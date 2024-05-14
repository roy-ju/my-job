import { useEffect } from 'react';

import { apiService } from '@/services';

import { ListingStatusResponse } from '@/services/listing/types';

export default function useListingViewMobile({
  statusData,
  listingID,
}: {
  statusData?: ListingStatusResponse & ErrorResponse;
  listingID: number;
}) {
  useEffect(() => {
    if (statusData?.can_access === true) {
      apiService.viewListing({
        listing_id: listingID,
        ip_address: '',
        device: '',
        browser: '',
      });
    }
  }, [listingID, statusData]);
}
