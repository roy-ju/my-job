import axios from '@/lib/axios';

export async function deleteSuggest(suggestID: number) {
  try {
    return await axios.post('/my/suggest/delete', { suggest_id: suggestID });
  } catch {
    return null;
  }
}
