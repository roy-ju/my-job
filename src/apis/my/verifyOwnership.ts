import axios from '@/lib/axios';

export interface VerifyAddressRequest {
  realestate_unique_number: string;
  address_detail: string;
  bubjungdong_code: string;
  building_name: string;
  jibun_address: string;
  eubmyundong: string;
  lat: number;
  li: string;
  long: number;
  road_name_address: string;
  sido: string;
  sigungu: string;
}

export interface VerifyAddressResponse {
  user_address_id: number;
  verified: boolean;
}

export default async function verifyOwnership(req: VerifyAddressRequest) {
  try {
    const { data } = await axios.post('/my/verifyownership', req);
    return data as VerifyAddressResponse & ErrorResponse;
  } catch (e) {
    return null;
  }
}
