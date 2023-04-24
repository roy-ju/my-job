import axios from '@/lib/axios';

export async function notIntersted(id: number) {
  try {
    return await axios.post('/my/suggest/recommend/notinterested', { suggest_recommend_id: id });
  } catch {
    return null;
  }
}
