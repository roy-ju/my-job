import axios from '@/lib/axios';

export async function deleteSuggestRecommend(suggestRecommendID: number) {
  try {
    return await axios.post('/suggest/recommend/delete', { suggest_recommend_id: suggestRecommendID });
  } catch {
    return null;
  }
}
