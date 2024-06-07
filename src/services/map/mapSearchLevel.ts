import axios from '@/lib/axios';

import { Filter } from '@/components/domains/map/pc-map-filter/types';

import { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from '@/components/domains/map/pc-map-filter/PriceFilter';

import { MapSearchFilter, MapSearchResponse, MapSearchLevelOneResponse } from './types';

export default async function mapSearch({
  level,
  bounds,
  filter,
  mapToggleValue,
  priceType,
  abortController,
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
  priceType: string;
  abortController?: AbortController;
}) {
  try {
    const f: MapSearchFilter = {
      realestate_type: filter.realestateTypes,
      buy_or_rent: filter.buyOrRents,
      saedae_min: Number(filter.minHousehold) === 0 ? null : Number(filter.minHousehold),
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
      room_count: filter.roomCounts,
    };

    if (mapToggleValue === 0 && filter.realestateTypeGroup === 'apt,oftl') {
      // 실거래가
      f.trade_price2_min = PRICE_STEPS[filter.priceRange[0]] === 0 ? null : PRICE_STEPS[filter.priceRange[0]];
      // f.trade_price2_min = PRICE_STEPS[filter.priceRange[0]];
      if (filter.priceRange[1] !== PRICE_STEPS.length - 1) {
        f.trade_price2_max = PRICE_STEPS[filter.priceRange[1]];
        f.trade_price2_min = f.trade_price2_min === null ? 0 : f.trade_price2_min;
      }
      f.jeonsae_deposit2_min =
        DEPOSIT_STEPS[filter.depositRange[0]] === 0 ? null : DEPOSIT_STEPS[filter.depositRange[0]];
      // f.jeonsae_deposit2_min = DEPOSIT_STEPS[filter.depositRange[0]];
      if (filter.depositRange[1] !== DEPOSIT_STEPS.length - 1) {
        f.jeonsae_deposit2_max = DEPOSIT_STEPS[filter.depositRange[1]];
        f.jeonsae_deposit2_min = f.jeonsae_deposit2_min === null ? 0 : f.jeonsae_deposit2_min;
      }
      f.monthly_rent_fee2_min = RENT_STEPS[filter.rentRange[0]] === 0 ? null : RENT_STEPS[filter.rentRange[0]];
      // f.monthly_rent_fee2_min = RENT_STEPS[filter.rentRange[0]];
      if (filter.rentRange[1] !== RENT_STEPS.length - 1) {
        f.monthly_rent_fee2_max = RENT_STEPS[filter.rentRange[1]];
        f.monthly_rent_fee2_min = f.monthly_rent_fee2_min === null ? 0 : f.monthly_rent_fee2_min;
      }
    } else {
      // 호가
      f.trade_price_min = PRICE_STEPS[filter.priceRange[0]] === 0 ? null : PRICE_STEPS[filter.priceRange[0]];
      // f.trade_price_min = PRICE_STEPS[filter.priceRange[0]];
      if (filter.priceRange[1] !== PRICE_STEPS.length - 1) {
        f.trade_price_max = PRICE_STEPS[filter.priceRange[1]];
        f.trade_price_min = f.trade_price_min === null ? 0 : f.trade_price_min;
      }
      f.jeonsae_deposit_min =
        DEPOSIT_STEPS[filter.depositRange[0]] === 0 ? null : DEPOSIT_STEPS[filter.depositRange[0]];
      // f.jeonsae_deposit_min = DEPOSIT_STEPS[filter.depositRange[0]];
      if (filter.depositRange[1] !== DEPOSIT_STEPS.length - 1) {
        f.jeonsae_deposit_max = DEPOSIT_STEPS[filter.depositRange[1]];
        f.jeonsae_deposit_min = f.jeonsae_deposit_min === null ? 0 : f.jeonsae_deposit_min;
      }
      f.monthly_rent_fee_min = RENT_STEPS[filter.rentRange[0]] === 0 ? null : RENT_STEPS[filter.rentRange[0]];
      // f.jeonsae_deposit_min = DEPOSIT_STEPS[filter.depositRange[0]];
      if (filter.rentRange[1] !== RENT_STEPS.length - 1) {
        f.monthly_rent_fee_max = RENT_STEPS[filter.rentRange[1]];
        f.monthly_rent_fee_max = f.monthly_rent_fee_max === null ? 0 : f.monthly_rent_fee_max;
      }
    }

    const { data } = await axios.post(
      `/map/search/level/${level}`,
      {
        ne_lat: bounds.ne.lat,
        ne_long: bounds.ne.lng,
        nw_lat: bounds.nw.lat,
        nw_long: bounds.nw.lng,
        sw_lat: bounds.sw.lat,
        sw_long: bounds.sw.lng,
        se_lat: bounds.se.lat,
        se_long: bounds.se.lng,
        price_type: priceType === 'buy' ? 1 : 2,
        ...f,
      },
      { signal: abortController?.signal },
    );
    return data as MapSearchResponse | MapSearchLevelOneResponse;
  } catch (e) {
    return null;
  }
}
