import axios from '@/lib/axios';

export interface VerifyAddressRequest {
  jibun_address: string;
  road_name_address: string;
  dong: string;
  ho: string;
}

export interface VerifyAddressResponse {
  count: number;
  
  address_list: {
    address_detail: string;
    full_road_name_address: string;
    realestate_unique_number: string;
  }[];
}

export default async function verifyAddress(req: VerifyAddressRequest) {
  try {
    const { data } = await axios.post('/my/verifyaddress', req);
    return data as VerifyAddressResponse & ErrorResponse;
  } catch (e) {
    return null;
  }
}
