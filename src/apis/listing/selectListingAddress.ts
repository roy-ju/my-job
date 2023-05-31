import axios from '@/lib/axios';

export interface SelectAddressRequest {
  listing_id: number;
  address: string;
  realestate_unique_number: string;
}

export type SelectAddressResponse = null | ErrorResponse;

export default async function selectListingAddress(req: SelectAddressRequest): Promise<SelectAddressResponse> {
  try {
    const { data } = await axios.post('/my/listing/address/selectone', req);
    return data;
  } catch {
    return null;
  }
}
