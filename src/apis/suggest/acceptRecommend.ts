import axios from '@/lib/axios';

export async function acceptRecommend(id: number) {
  try {
    return await axios.post('/my/suggest/recommend/accept', { suggest_recommend_id: id });
  } catch {
    return null;
  }
}
