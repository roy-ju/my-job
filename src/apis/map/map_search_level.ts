import { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from '@/components/organisms/MapFilter/PriceFilter';
import { Filter } from '@/components/organisms/MapFilter/types';
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
  gap_investment: boolean;
}

export default async function mapSearch({
  level,
  bounds,
  filter,
  mapToggleValue,
}: {
  level: number;
  bounds: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
    nw: { lat: number; lng: number };
    se: { lat: number; lng: number };
  };
  filter: Filter;
  mapToggleValue: number;
}) {
  try {
    const f: MapSearchFilter = {
      realestate_type: filter.realestateTypes,
      buy_or_rent: filter.buyOrRents,
      saedae_min: Number(filter.minHousehold),
      listing_type: filter.quickSale ? 3 : mapToggleValue === 1 ? 0 : null,
      gap_investment: filter.gapInvestment,
      trade_price_max: null,
      trade_price_min: null,
      trade_price2_max: null,
      trade_price2_min: null,
      saedae_max: null,
      jeonsae_deposit2_max: null,
      jeonsae_deposit2_min: null,
      jeonsae_deposit_max: null,
      jeonsae_deposit_min: null,
      monthly_rent_fee2_max: null,
      monthly_rent_fee2_min: null,
      monthly_rent_fee_max: null,
      monthly_rent_fee_min: null,
    };

    if (mapToggleValue === 0) {
      // 실거래가
      f.trade_price2_min = PRICE_STEPS[filter.priceRange[0]];
      if (filter.priceRange[1] !== PRICE_STEPS.length - 1) {
        f.trade_price2_max = PRICE_STEPS[filter.priceRange[1]];
      }

      f.jeonsae_deposit2_min = DEPOSIT_STEPS[filter.depositRange[0]];
      if (filter.depositRange[1] !== DEPOSIT_STEPS.length - 1) {
        f.jeonsae_deposit2_max = DEPOSIT_STEPS[filter.depositRange[1]];
      }

      f.monthly_rent_fee2_min = RENT_STEPS[filter.rentRange[0]];
      if (filter.rentRange[1] !== RENT_STEPS.length - 1) {
        f.monthly_rent_fee2_max = RENT_STEPS[filter.rentRange[1]];
      }
    } else {
      // 호가
      f.trade_price_min = PRICE_STEPS[filter.priceRange[0]];
      if (filter.priceRange[1] !== PRICE_STEPS.length - 1) {
        f.trade_price_max = PRICE_STEPS[filter.priceRange[1]];
      }
      f.jeonsae_deposit_min = DEPOSIT_STEPS[filter.depositRange[0]];
      if (filter.depositRange[1] !== DEPOSIT_STEPS.length - 1) {
        f.jeonsae_deposit_max = DEPOSIT_STEPS[filter.depositRange[1]];
      }

      f.monthly_rent_fee_min = RENT_STEPS[filter.rentRange[0]];
      if (filter.rentRange[1] !== RENT_STEPS.length - 1) {
        f.monthly_rent_fee_max = RENT_STEPS[filter.rentRange[1]];
      }
    }

    const { data } = await axios.post(`/map/search/level/${level}`, {
      ne_lat: bounds.ne.lat,
      ne_long: bounds.ne.lng,
      nw_lat: bounds.nw.lat,
      nw_long: bounds.nw.lng,
      sw_lat: bounds.sw.lat,
      sw_long: bounds.sw.lng,
      se_lat: bounds.se.lat,
      se_long: bounds.se.lng,
      ...f,
    });
    return data as MapSearchResponse | MapSearchLevelOneResponse;
  } catch (e) {
    return null;
  }
}
