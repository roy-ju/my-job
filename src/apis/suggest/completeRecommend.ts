import axios from '@/lib/axios';

export async function completeRecommend(id: number) {
  try {
    return await axios.post('/suggest/recommend/complete', { suggest_recommend_id: id });
  } catch {
    return null;
  }
}
