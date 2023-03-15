import axios from '@/lib/axios';

export interface GetDanjiSummaryResponse {
  buy_listing_count: number;
  rent_listing_count?: number;
  buy_price: number;
  rent_price?: number;
  pnu: string;
  realestate_type: number;
  string: string;
  saedae_count: number;
  latest_deal_date?: string;
  use_accepted_year?: string;
}

export default async function getDanjiSummary({
  pnu,
  buyOrRent,
  danjiRealestateType,
}: {
  pnu: string;
  buyOrRent: string;
  danjiRealestateType: number;
}) {
  try {
    const { data } = await axios.post('/map/danji/summary', {
      pnu,
      buy_or_rent: buyOrRent,
      danji_realestate_type: danjiRealestateType,
    });
    return data as GetDanjiSummaryResponse;
  } catch (e) {
    return null;
  }
}
