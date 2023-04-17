import axios from '@/lib/axios';

export interface CreateBiddingResponse {
  can_receive_suggest: boolean;
  bidding_id: number;
}

export default async function createBidding(req: any) {
  try {
    const { data } = await axios.post('/bidding/create', { ...req });

    return data as CreateBiddingResponse & ErrorResponse;
  } catch (e) {
    return null;
  }
}
