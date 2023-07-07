import axios from '@/lib/axios';

export type LawQnaLikeResponse = ErrorResponse;

export type LawQnaDislikeResponse = ErrorResponse;

export async function lawQnaLike(req: { law_qna_id: number }): Promise<LawQnaLikeResponse | null> {
  try {
    const { data } = await axios.post('/lawqna/like', req);
    return data;
  } catch (e) {
    return null;
  }
}

export async function lawQnaDislike(req: { law_qna_id: number }): Promise<LawQnaDislikeResponse | null> {
  try {
    const { data } = await axios.post('/lawqna/dislike', req);
    return data;
  } catch (e) {
    return null;
  }
}
