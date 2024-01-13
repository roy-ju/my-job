/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from '@/components/organisms/MapFilter/PriceFilter';

import { Filter } from '@/components/organisms/MapFilter/types';

import { MapBounds } from '@/hooks/useMobileMapLayout';

import { MapSearchFilter } from './mapSearchLevel';

interface ListItem {
  listing_id: number;
  thumbnail_full_path?: string;
  listing_title: string;
  realestate_type: number;
  jeonyong_area: string;
  floor_description: string;
  total_floor: string;
  direction: string;
  buy_or_rent: number;
  quick_sale?: boolean;
  is_participating: boolean;
  view_count: number;
  participants_count: number;
  trade_or_deposit_price: number;
  monthly_rent_fee: number;
  eubmyundong: string;
  is_favorite: boolean;
  bidding_id: any;
  label_text: string;
  status_text: string;
}

export interface MapSearchListResponse {
  count: number;
  list: ListItem[] | null;
}

function getParams(mapToggleValue: number, bounds: MapBounds, filter: Filter) {
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
    f.jeonsae_deposit2_min = DEPOSIT_STEPS[filter.depositRange[0]] === 0 ? null : DEPOSIT_STEPS[filter.depositRange[0]];
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
    f.jeonsae_deposit_min = DEPOSIT_STEPS[filter.depositRange[0]] === 0 ? null : DEPOSIT_STEPS[filter.depositRange[0]];
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
  return {
    ne_lat: bounds.ne.lat,
    ne_long: bounds.ne.lng,
    nw_lat: bounds.nw.lat,
    nw_long: bounds.nw.lng,
    sw_lat: bounds.sw.lat,
    sw_long: bounds.sw.lng,
    se_lat: bounds.se.lat,
    se_long: bounds.se.lng,
    map_level: bounds.mapLevel,
    price_type: filter.buyOrRents === '2,3' ? 2 : 1,
    ...f,
  };
}

function getKey(mapToggleValue: number, bounds: MapBounds | null, filter: Filter | null, listingIDs?: string) {
  if (!bounds || !filter) return () => null;

  return (size: number, previousPageData: any) => {
    const previousLength = previousPageData?.list?.length ?? 0;
    // const totalCount = previousPageData?.count ?? 0;

    if (previousPageData && previousLength === 0) {
      return null;
    }

    // listing ids 가 있을때는 무한스크롤/페이지네이션 없음
    if (listingIDs) {
      if (size > 0) {
        return null;
      }

      return [`/map/search/list`, { page_number: size + 1, listing_ids: listingIDs }];
    }

    return [`/map/search/list`, { page_number: size + 1, ...getParams(mapToggleValue, bounds, filter) }];
  };
}

export default function useAPI_MapSearchList(
  mapToggleValue: number,
  bounds: MapBounds | null,
  filter: Filter | null,
  listingIDs?: string,
) {
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<MapSearchListResponse>(getKey(mapToggleValue, bounds, filter, listingIDs), null, {
    revalidateFirstPage: false,
  });

  const data = useMemo(() => {
    if (!dataList) return [];

    return dataList
      ?.map((item) => item.list)
      .filter((item) => Boolean(item))
      .flat() as MapSearchListResponse['list'];
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    isLoading,
    increamentPageNumber,
    mutate,
  };
}
