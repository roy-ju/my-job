import axios from '@/lib/axios';

export default async function deleteMyListing(listingID: number) {
  const { data } = await axios.post('/my/listing/delete', {
    listing_id: listingID,
  });
  return data;
}
