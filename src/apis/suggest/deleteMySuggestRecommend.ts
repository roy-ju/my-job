import axios from '@/lib/axios';

export async function deleteMySuggestRecommend(suggestRecommendID: number) {
  try {
    return await axios.post('/my/suggest/recommend/delete', { suggest_recommend_id: suggestRecommendID });
  } catch {
    return null;
  }
}
