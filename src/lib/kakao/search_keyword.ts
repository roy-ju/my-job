import axios from 'axios';

export interface KeywordSearchResponse {
  documents: {
    address_name: string;
    category_group_code: string;
    category_group_name: string;
    category_name: string;
    distance: string;
    id: string;
    phone: string;
    place_name: string;
    place_url: string;
    road_address_name: string;
    x: string;
    y: string;
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

export default async function searchKeyword(query: string) {
  try {
    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      },
    );
    return data as KeywordSearchResponse;
  } catch (e) {
    return null;
  }
}
