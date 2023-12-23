import axios from 'axios';

type SearchNewsNaverReq = {
  /** 검색어 UTF-8 인코딩 */
  query: string;

  query2?: string;

  /** 한 번에 표시할 검색 결과 개수(기본값: 10, 최댓값: 100) */
  display?: number;

  /** 검색 시작 위치(기본값: 1, 최댓값: 1000) */
  start?: number;

  /** 검색 결과 정렬 방법 - sim: 정확도순으로 내림차순 정렬(기본값) - date: 날짜순으로 내림차순 정렬 */
  sort?: string;
};

export type NewsItem = {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl?: string;
};

export type SeachNewsNaverRes = {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: NewsItem[];
};

export async function scrapeNews(req: SearchNewsNaverReq): Promise<NewsItem[] | null> {
  const { query, query2, display, start, sort } = req;

  try {
    const { data } = await axios.get(`/api/scrape/news`, { params: { query, query2, display, start, sort } });

    return data;
  } catch (e) {
    return null;
  }
}
