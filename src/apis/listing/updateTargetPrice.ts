import axios from '@/lib/axios';

export type CancelListingResponse = ErrorResponse;

export default async function updateTargetPrice(req: {
  listing_id: number;
  trade_or_deposit_price: number;
  monthly_rent_fee?: number;
}): Promise<CancelListingResponse | null> {
  try {
    const { data } = await axios.post('/listing/seller/targetprice/update', req);
    return data;
  } catch (e) {
    return null;
  }
}
