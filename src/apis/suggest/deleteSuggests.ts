import axios from '@/lib/axios';

export async function deleteSuggests(suggestIDs: number[]) {
  try {
    return await axios.post('/my/suggest/delete', { suggest_ids: suggestIDs });
  } catch {
    return null;
  }
}
