import axios from '@/lib/axios';

export async function addFavorite(listingID: number) {
  try {
    return await axios.post('/listing/favorite/add', { listing_id: listingID });
  } catch {
    return null;
  }
}
