import useSWR from 'swr';

export type GetDanjiDetailResponse = {
  pnu: string;
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
} & ErrorResponse;

export function useAPI_GetDanjiDetail({
  pnu,
  realestateType,
}: {
  pnu?: string | null;
  realestateType?: number | null;
}) {
  const { data, error, mutate } = useSWR<GetDanjiDetailResponse>(
    pnu && realestateType ? ['/danji/get/v2', { pnu, realestate_type: Number(realestateType) }] : null,
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    danji: data,
    isLoading: pnu && realestateType ? !data && !error : false,
    mutate,
    error,
  };
}
