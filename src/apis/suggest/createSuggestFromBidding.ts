import axios from '@/lib/axios';

export default async function createSuggestFromBidding(biddingID: number) {
  try {
    const { data } = await axios.post('/suggest/frombidding/create', { bidding_id: biddingID });
    return data;
  } catch (e) {
    return null;
  }
}
