import axios from '@/lib/axios';

export async function removeFavorite(listingID: number) {
  try {
    return await axios.post('/listing/favorite/remove', {
      listing_id: listingID,
    });
  } catch {
    return null;
  }
}
