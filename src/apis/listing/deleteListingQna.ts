import axios from '@/lib/axios';

interface Request {
  qna_id: number;
}

export default async function deleteListingQna(req: Request) {
  try {
    const { data } = await axios.post('/qna/delete', {
      ...req,
    });
    return data;
  } catch (e) {
    return null;
  }
}
