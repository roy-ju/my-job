import axios from '@/lib/axios';

export default async function updateBidding(req: any) {
  try {
    const { data } = await axios.post('/bidding/update', { ...req });

    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
