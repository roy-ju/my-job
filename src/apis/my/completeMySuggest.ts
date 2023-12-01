import axios from '@/lib/axios';

interface Request {
  suggest_id: number;
  recommender_id: number;
  is_recommender_agent: boolean;
}

export default async function completeMySuggest(req: Request) {
  try {
    await axios.post('/my/suggest/suggestor/complete', req);
    return null;
  } catch (e) {
    return null;
  }
}
