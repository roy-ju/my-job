import axios from '@/lib/axios';

export type CancelListingResponse = ErrorResponse;

export default async function viewListing(req: {
  listing_id: number;
  ip_address: string;
  device: string;
  browser: string;
}): Promise<CancelListingResponse | null> {
  try {
    const { data } = await axios.post('/listing/view', req);
    return data;
  } catch (e) {
    return null;
  }
}
