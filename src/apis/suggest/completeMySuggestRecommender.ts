import axios from '@/lib/axios';

export async function completeMySuggestRecommender({
  suggest_id,
  suggestor_id,
}: {
  suggest_id: number;
  suggestor_id: number;
}) {
  try {
    return await axios.post('/my/suggest/recommender/complete', { suggest_id, suggestor_id });
  } catch {
    return null;
  }
}
