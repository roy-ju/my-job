import axios from '@/lib/axios';

type SuggestRecommendRes = null | ErrorResponse;

type SuggetRecommendReq = {
  suggest_id: number;
  address_free_text: string;
  buy_or_rent: number;

  trade_price?: number;
  deposit?: number;
  monthly_rent_fee?: number;

  floor?: string;
  jeonyong_areas?: string;
  direction?: string;

  note: string;
};

export default async function createSuggestRecommend(req: SuggetRecommendReq) {
  try {
    const { data } = await axios.post('/suggest/recommend/create', { ...req });

    return data as SuggestRecommendRes;
  } catch (e) {
    return null;
  }
}
