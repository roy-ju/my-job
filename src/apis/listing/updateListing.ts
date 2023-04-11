import axios from '@/lib/axios';

export default async function updateListing(req: any) {
  try {
    const { data } = await axios.post('/listing/update/v2', {
      ...req,
    });
    return data as ErrorResponse;
  } catch (e) {
    return null;
  }
}
