import axios from 'axios';

export interface CoordToRegionResponse {
  documents: {
    region_type: string;
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_4depth_name: string;
    code: string;
    x: number;
    y: number;
  }[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region?: null;
      selected_region: string;
    };
    total_count: number;
  };
}

export default async function coordToRegion(x: number, y: number) {
  try {
    const params = new URLSearchParams({
      x: `${x}`,
      y: `${y}`,
    });

    const { data } = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?`, {
      params,
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    });
    return data as CoordToRegionResponse;
  } catch (e) {
    return null;
  }
}
