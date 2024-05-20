import { useEffect } from 'react';

import { apiService } from '@/services';

import { ListingStatusResponse } from '@/services/listing/types';

export default function useListingViewPc({
  ipAddress,
  listingID,
  statusData,
}: {
  ipAddress?: string;
  listingID: number;
  statusData?: ListingStatusResponse & ErrorResponse;
}) {
  useEffect(() => {
    if (statusData?.can_access === true) {
      apiService.viewListing({
        listing_id: listingID,
        ip_address: ipAddress !== '::1' ? ipAddress ?? '' : '',
        device: '',
        browser: '',
      });
    }
  }, [listingID, statusData, ipAddress]);
}
