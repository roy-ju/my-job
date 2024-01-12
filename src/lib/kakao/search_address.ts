import axios from 'axios';

export interface AddressSearchResponse {
  documents: {
    address: {
      address_name: string;
      b_code: string;
      h_code: string;
      main_address_no: string;
      mountain_yn: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_h_name: string;
      region_3depth_name: string;
      sub_address_no: string;
      x: string;
      y: string;
    } | null;
    address_name: string;
    address_type: string;
    road_address: {
      address_name: string;
      building_name: string;
      main_building_no: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      road_name: string;
      sub_building_no: string;
      underground_yn: string;
      x: string;
      y: string;
      zone_no: string;
    } | null;
    x: string;
    y: string;
  }[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

export async function searchAddress(query: string): Promise<AddressSearchResponse | null> {
  try {
    // const { data } = await axios.get(
    //   `https://dapi.kakao.com/v2/local/search/address.json?query=${query}&analyze_type=similar`,
    //   {
    //     headers: {
    //       Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    //     },
    //   },
    // );
    // return data;

    const { data } = await axios.get(`/api/kakao/searchAddress`, {
      params: { query },
    });

    return data as AddressSearchResponse;
  } catch (e) {
    return null;
  }
}
