import useSWR from 'swr';

export type GetDanjiMapSchools = {
  list:
    | [
        {
          school_name: string;
          school_id: string;
          school_type: string;
          long: number;
          lat: number;
          distance_in_km: number;
        },
      ]
    | null;
} & ErrorResponse;

export function useAPI_DanjiMapSchools({
  pnu,
  realestateType,
  schoolTypes,
}: {
  pnu?: string | null;
  realestateType?: number | null;
  schoolTypes?: string | null;
}) {
  const { data, error, mutate } = useSWR<GetDanjiMapSchools>(
    pnu && realestateType && schoolTypes
      ? [
          '/danji/map/schools',
          {
            pnu,
            realestate_type: Number(realestateType),
            school_types: schoolTypes,
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    list: data?.list || [],
    error,
    mutate,
  };
}
