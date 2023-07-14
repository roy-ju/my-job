import axios from '@/lib/axios';

interface addMyFavoriteDanjiRequest {
  danji_id: number;
  realestate_type: number;
}

export default async function addMyFavoriteDanji(req: addMyFavoriteDanjiRequest) {
  try {
    await axios.post('/danji/favorite/add', req);
    return null;
  } catch (e) {
    return null;
  }
}
