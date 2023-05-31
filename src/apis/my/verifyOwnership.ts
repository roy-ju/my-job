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

export default async function verifyOwnership(req: VerifyAddressRequest) {
  try {
    await axios.post('/my/verifyownership', req);
    return null;
  } catch (e) {
    return null;
  }
}
