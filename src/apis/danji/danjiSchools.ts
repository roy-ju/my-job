import useSWR from 'swr';

export type GetDanjiSchoolsResponse = {
  list_all:
    | [
        {
          school_id: string;
          name: string;
          school_type: string;
          found_type: string;
          students_per_teacher_count: number;
          distance_in_km: number;
        },
      ]
    | null;
  list_elementary_schools:
    | [
        {
          school_id: string;
          name: string;
          school_type: string;
          found_type: string;
          students_per_teacher_count: number;
          distance_in_km: number;
        },
      ]
    | null;
  list_middle_schools:
    | [
        {
          school_id: string;
          name: string;
          school_type: string;
          found_type: string;
          students_per_teacher_count: number;
          distance_in_km: 0.884931097977557;
        },
      ]
    | null;
  list_high_schools:
    | [
        {
          school_id: string;
          name: string;
          school_type: string;
          found_type: string;
          students_per_teacher_count: number;
          distance_in_km: number;
        },
      ]
    | null;
} & ErrorResponse;

export function useAPI_DanjiSchools({
  pnu,
  realestateType,
}: {
  pnu?: string | null;
  realestateType?: number | null;
}) {
  const { data, error, mutate } = useSWR<GetDanjiSchoolsResponse>(
    pnu && realestateType
      ? [
          '/danji/schools',
          {
            pnu,
            realestate_type: Number(realestateType),
          },
        ]
      : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    listAll: data?.list_all || [],
    listElementarySchools: data?.list_elementary_schools || [],
    listMiddleSchools: data?.list_middle_schools || [],
    listHighSchools: data?.list_high_schools || [],
    error,
    mutate,
  };
}
