import axios from '@/lib/axios';

export default async function danjiRecommendationFinal(params: any): Promise<ErrorResponse | null> {
  const { data } = await axios.post('/suggest/danji/create', params);
  return data;
}
