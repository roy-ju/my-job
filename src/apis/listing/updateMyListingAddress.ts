import axios from '@/lib/axios';

export interface UpdateListingAddressRequest {
  listing_id: number;
  bubjungdong_code: string;
  road_name_address: string;
  jibun_address: string;
  sido: string;
  sigungu: string;
  eubmyundong: string;
  li: '';
  building_name: string;
  long: number;
  lat: number;
  dong?: string;
  ho?: string;
}

export type UpdateListingAddressResponse = null | ErrorResponse;

export default async function updateMyListingAddress(
  req: UpdateListingAddressRequest,
): Promise<UpdateListingAddressResponse | null> {
  try {
    const { data } = await axios.post('/my/listing/address/update', req);
    return data;
  } catch {
    return null;
  }
}
