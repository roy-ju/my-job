import axios from '@/lib/axios';

interface deleteMyListingRequest {
  listing_id: number;
}

export default async function deleteMyListing(req: deleteMyListingRequest) {
  try {
    await axios.post('my/listing/delete', req);
    return null;
  } catch (e) {
    return null;
  }
}
