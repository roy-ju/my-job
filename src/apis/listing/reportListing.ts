import axios from '@/lib/axios';

interface Request {
  listing_id: number;
  message: string;
}

export default async function reportListing(req: Request) {
  try {
    const { data } = await axios.post('/listing/report/create', {
      ...req,
    });
    return data;
  } catch (e) {
    return null;
  }
}
