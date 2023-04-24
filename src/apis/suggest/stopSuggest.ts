import axios from '@/lib/axios';

export async function stopSuggest(suggestID: number) {
  try {
    return await axios.post('/my/suggest/stop', { suggest_id: suggestID });
  } catch {
    return null;
  }
}
