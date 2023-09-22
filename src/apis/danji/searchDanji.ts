import axios from '@/lib/axios';

interface SearchDanjiRequest {
  page_number: number;
  query: string;
}
export interface SearchDanjiResponseItem {
  danji_id: number;
  name: string;
  address: string;
  realestate_type: number;
}

interface SearchDanjiResponse {
  page_size: number;
  page_number: number;
  list: SearchDanjiResponseItem[];
}

export default async function searchDanji({ page_number, query }: SearchDanjiRequest) {
  try {
    const { data } = await axios.post<SearchDanjiResponse>('/danji/search', {
      page_size: 10,
      page_number,
      query,
    });
    return data?.list ?? [];
  } catch (e) {
    throw new Error('단지 검색에 실패했습니다.');
  }
}
