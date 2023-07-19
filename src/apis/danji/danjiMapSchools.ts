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
  danjiId,
  realestateType,
  schoolTypes,
}: {
  danjiId?: number | null;
  realestateType?: number | null;
  schoolTypes?: string | null;
}) {
  const { data, error, mutate } = useSWR<GetDanjiMapSchools>(
    danjiId && realestateType && schoolTypes
      ? [
          '/danji/map/schools',
          {
            danji_id: danjiId,
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
