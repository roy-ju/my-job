import { useEffect } from 'react';

import { ListingDetailResponse } from '@/services/listing/types';

export default function useWindowCallbacksSelectMarkerPc({ data }: { data?: ListingDetailResponse & ErrorResponse }) {
  useEffect(() => {
    if (data && data.listing && typeof window !== 'undefined') {
      window.Negocio.callbacks.selectMarker({
        id: `listingMarker:${data.listing?.id}`,
        lat: data.listing?.lat,
        lng: data.listing?.long,
      });
    }
  }, [data]);
}
