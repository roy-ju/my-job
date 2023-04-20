import axios from '@/lib/axios';

interface addMyFavoriteListingRequest {
  listing_id: number;
}

export default async function addMyFavoriteListing(req: addMyFavoriteListingRequest) {
  try {
    await axios.post('/listing/favorite/add', req);
    return null;
  } catch (e) {
    return null;
  }
}
