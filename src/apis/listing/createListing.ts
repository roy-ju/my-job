import axios from '@/lib/axios';

export interface CreateListingResponse {
  listing_id: number;
}

interface Request {
  road_name_address: string;
  jibun_address: string;
  bubjungdong_code: string;
  sido: string;
  sigungu: string;
  eubmyundong: string;
  li: string;
  building_name: string;
  long: number;
  lat: number;
  dong: string;
  ho: string;
}

export default async function createListing(req: Request) {
  try {
    const { data } = await axios.post('/listing/create/v2', {
      ...req,
    });
    return data as CreateListingResponse;
  } catch (e) {
    return null;
  }
}
