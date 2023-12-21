import axios from 'axios';

export type SearchCategoryRequest = {
  /**	카테고리 코드 */
  category_group_code: string;
  /**	중심 좌표의 X값 혹은 longitude 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능. */
  x?: string;
  /**	중심 좌표의 Y값 혹은 latitude 특정 지역을 중심으로 검색하려고 할 경우 radius와 함께 사용 가능. */
  y?: string;
  /**	중심 좌표부터의 반경거리. 특정 지역을 중심으로 검색하려고 할 경우 중심좌표로 쓰일 x,y와 함께 사용. 단위 meter, 0~20000 사이의 값 */
  radius?: number;
  /**	사각형 범위내에서 제한 검색을 위한 좌표 지도 화면 내 검색시 등 제한 검색에서 사용 가능 좌측 X 좌표, 좌측 Y 좌표, 우측 X 좌표, 우측 Y 좌표 형식 x, y, radius 또는 rect 필수 */
  rect?: string;
  /**	결과 페이지 번호 1~45 사이의 값 (기본값: 1) */
  page?: number;
  /**	한 페이지에 보여질 문서의 개수 1~15 사이의 값 (기본값: 15) */
  size?: number;
  /**	결과 정렬 순서, distance 정렬을 원할 때는 기준좌표로 쓰일 x, y 파라미터 필요 */
  sort?: string;
};

export type SearchCategoryResponse = {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
    same_name:
      | {
          region: string[] | null;
          keyword: string;
          selected_region: string;
        }[]
      | null;
  };
  documents: {
    id: string;
    place_name: string;
    category_name: string;
    category_group_code: string;
    category_group_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    x: string;
    y: string;
    place_url: string;
    distance: string;
  }[];
};

export async function searchCategoryGroup(req: SearchCategoryRequest): Promise<SearchCategoryResponse | null> {
  try {
    if (req.category_group_code && req.x && req.y && req.radius && req.page) {
      // const { data } = await axios.get(
      //   `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${req.category_group_code}&x=${req.x}&y=${req.y}&radius=${req.radius}&page=${req.page}`,
      //   {
      //     headers: {
      //       Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      //     },
      //   },
      // );

      // return data;

      const { data } = await axios.get('/api/kakao/searchCategory', {
        params: { query: req },
      });

      return data as SearchCategoryResponse;
    }
    return null;
  } catch (e) {
    return null;
  }
}
