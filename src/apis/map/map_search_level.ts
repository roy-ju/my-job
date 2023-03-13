import axios from '@/lib/axios';

export interface MapSearchResponse {
  listing_count: number;
  results: {
    bubjungdong_code: string;
    bubjungdong_name: string;
    danji_count: number;
    listing_count: number;
    lat: number;
    long: number;
  }[];
}

export interface MapSearchLevelOneResponse {
  listing_count: number;
  danji_list: {
    pnu: string;
    danji_realestate_type: number;
    pyoung: string;
    price: number;
    monthly_rent_fee: number;
    listing_count: number;
    long: number;
    lat: number;
    road_name_address: string;
    jibun_address: string;
  }[];
  listing_list: {
    listing_count: number;
    listing_ids: string;
    trade_price: number;
    deposit: number;
    monthly_rent_fee: number;
    long: number;
    lat: number;
  }[];
}

export interface MapSearchFilter {
  trade_price_min?: number | null;
  trade_price_max?: number | null;
  jeonsae_deposit_min?: number | null;
  jeonsae_deposit_max?: number | null;
  monthly_rent_fee_min?: number | null;
  monthly_rent_fee_max?: number | null;
  trade_price2_min?: number | null;
  trade_price2_max?: number | null;
  jeonsae_deposit2_min?: number | null;
  jeonsae_deposit2_max?: number | null;
  monthly_rent_fee2_min?: number | null;
  monthly_rent_fee2_max?: number | null;
  saedae_min?: number | null;
  saedae_max?: number | null;
  listing_type?: number | null;
  buy_or_rent: string;
  realestate_type: string;
}

export default async function mapSearch({
  level,
  bounds,
}: {
  level: number;
  bounds: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
    nw: { lat: number; lng: number };
    se: { lat: number; lng: number };
  };
}) {
  try {
    const { data } = await axios.post(`/map/search/level/${level}`, {
      ne_lat: bounds.ne.lat,
      ne_long: bounds.ne.lng,
      nw_lat: bounds.nw.lat,
      nw_long: bounds.nw.lng,
      sw_lat: bounds.sw.lat,
      sw_long: bounds.sw.lng,
      se_lat: bounds.se.lat,
      se_long: bounds.se.lng,
      realestate_type: '10,20,30,40,50,60',
      buy_or_rent: '1',
    });
    return data as MapSearchResponse | MapSearchLevelOneResponse;
  } catch (e) {
    return null;
  }
}
