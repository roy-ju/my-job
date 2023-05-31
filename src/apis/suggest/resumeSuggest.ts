import axios from '@/lib/axios';

export async function resumeSuggest(suggestID: number) {
  try {
    return await axios.post('/my/suggest/resume', { suggest_id: suggestID });
  } catch {
    return null;
  }
}
