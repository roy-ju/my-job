import axios from '@/lib/axios';

export interface CreateListingResponse {
  listing_id: number;
}

export default async function createListing(req: any) {
  try {
    const { data } = await axios.post('/listing/create', {
      ...req,
    });
    return data as CreateListingResponse & ErrorResponse;
  } catch (e) {
    return null;
  }
}
