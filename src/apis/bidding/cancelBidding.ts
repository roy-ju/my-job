import axios from '@/lib/axios';

export default async function cancelBidding(listingID: number, biddingID: number) {
  try {
    const { data } = await axios.post('/bidding/cancel', { listing_id: listingID, bidding_id: biddingID });
    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
