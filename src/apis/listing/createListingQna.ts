import axios from '@/lib/axios';

interface Request {
  listing_id: number;
  message: string;
}

export default async function createListingQna(req: Request) {
  try {
    const { data } = await axios.post('/qna/create', {
      ...req,
    });
    return data;
  } catch (e) {
    return null;
  }
}
