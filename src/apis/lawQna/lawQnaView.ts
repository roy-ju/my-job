import axios from '@/lib/axios';

export type LawQnaViewResponse = ErrorResponse;

export default async function lawQnaView(req: {
  law_qna_id: number;
  ip_address: string;
  device: string;
  browser: string;
}): Promise<LawQnaViewResponse | null> {
  try {
    const { data } = await axios.post('/lawqna/view', req);
    return data;
  } catch (e) {
    return null;
  }
}
