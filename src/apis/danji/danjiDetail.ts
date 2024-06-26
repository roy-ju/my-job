import useSWR from 'swr';

export type GetDanjiDetailResponse = {
  danji_id: number;
  type: number;
  name: string;
  bubjungdong_code: string;
  road_name_address: string;
  jibun_address: string;
  long: number;
  lat: number;
  total_saedae_count: string;
  use_accepted_year: string;
  construction_start_date: string;
  total_dong_count: string;
  total_parking_count: string;
  parking_per_saedae: string;
  highest_floor: string;
  gunpae_rate: string;
  yongjuk_rate: string;
  building_purpose: string;
  building_purpose_etc: string;
  daeji_area: string;
  architecture_area: string;
  total_area: string;
  buy_listing_count: number;
  rent_listing_count: number;
  hall_type: string;
  sigong_company: string;
  heat_type: string;
  is_favorite: boolean;
  latest_price: number;
  latest_pyoung: string;
  sido_name: string;
  sigungu_name: string;
  sido_code: string;
  sigungu_code: string;
  jeonyong_min: number;
  jeonyong_max: number;
  suggest_count: number;

  latest_buy_year: string;
  latest_buy_month: string;
  latest_buy_day: string;
  latest_buy_price: number;

  latest_rent_day: string;
  latest_rent_deposit: number;
  latest_rent_month: string;
  latest_rent_monthly_rent_fee: number;
  latest_rent_year: string;
} & ErrorResponse;

export function useAPI_GetDanjiDetail({
  preFetchedData,
  danjiId,
}: {
  preFetchedData?: { [key: string]: any } | null;
  danjiId?: number | null;
}) {
  const { data, error, mutate } = useSWR<GetDanjiDetailResponse>(
    danjiId ? ['/danji/detail', { danji_id: danjiId }] : null,
    null,
    {
      ...(preFetchedData ? { fallbackData: preFetchedData as GetDanjiDetailResponse } : {}),
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    danji: data,
    isLoading: danjiId ? !data && !error : false,
    mutate,
    error,
  };
}
