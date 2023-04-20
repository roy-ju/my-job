import axios from '@/lib/axios';

interface deleteMyFavoriteListingRequest {
  listing_id: number;
}

export default async function deleteMyFavoriteListing(req: deleteMyFavoriteListingRequest) {
  try {
    await axios.post('/listing/favorite/delete', req);
    return null;
  } catch (e) {
    return null;
  }
}
