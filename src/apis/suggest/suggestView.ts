import axios from '@/lib/axios';

export type SuggestViewResponse = ErrorResponse;

export default async function suggestView(req: {
  suggest_id: number;
  ip_address: string;
  device: string;
  browser: string;
}): Promise<SuggestViewResponse | null> {
  try {
    const { data } = await axios.post('/suggest/view', req);
    return data;
  } catch (e) {
    return null;
  }
}
