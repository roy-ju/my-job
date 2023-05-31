import axios from '@/lib/axios';

export type CancelListingResponse = ErrorResponse;

export default async function cancelListing(req: {
  listing_id: number;
  cancel_reason: string;
}): Promise<CancelListingResponse | null> {
  try {
    const { data } = await axios.post('/listing/seller/cancel', req);
    return data;
  } catch (e) {
    return null;
  }
}
