import axios from '@/lib/axios';

interface deleteMyFavoriteDanjiRequest {
  pnu: string;
  realestate_type: number;
}

export default async function deleteMyFavoriteDanji(req: deleteMyFavoriteDanjiRequest) {
  try {
    await axios.post('/danji/favorite/remove', req);
    return null;
  } catch (e) {
    return null;
  }
}
