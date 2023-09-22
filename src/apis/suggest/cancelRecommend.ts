import axios from '@/lib/axios';

export async function cancelRecommend(suggestRecommendID: number) {
  try {
    return await axios.post('/suggest/recommend/cancel', { suggest_recommend_id: suggestRecommendID });
  } catch {
    return null;
  }
}
