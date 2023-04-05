import useSWR from 'swr';

export type GetSigunguListResponse = {
  list:
    | [
        {
          name: string;
          code: string;
        },
      ]
    | null;
} & ErrorResponse;

export function useMapSigunguList({ sidoCode }: { sidoCode?: string | null }) {
  const { data, error } = useSWR<GetSigunguListResponse>(
    sidoCode ? ['/danji/sigungu/list', { sido_code: sidoCode }] : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
