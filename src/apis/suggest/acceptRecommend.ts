import axios from '@/lib/axios';

export async function acceptRecommend(request: {
  suggest_id: number;
  recommender_id: number;
  is_recommender_agent: boolean;
}) {
  try {
    return await axios.post('/my/suggest/recommend/accept', request);
  } catch {
    return null;
  }
}
