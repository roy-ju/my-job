import axios from '@/lib/axios';

export async function cancelMySuggestRecommend(suggestRecommendID: number) {
  try {
    return await axios.post('/my/suggest/recommend/cancel', { suggest_recommend_id: suggestRecommendID });
  } catch {
    return null;
  }
}
