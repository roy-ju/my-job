import useSWR from 'swr';

export type GetEubmyeondongListResponse = {
  list:
    | [
        {
          name: string;
          code: string;
          lat: number;
          long: number;
        },
      ]
    | null;
} & ErrorResponse;

export function useMapEubmyeondongList({ sigunguCode }: { sigunguCode?: string | null }) {
  const { data, error } = useSWR<GetEubmyeondongListResponse>(
    sigunguCode ? ['/danji/eubmyundong/list', { sigungu_code: sigunguCode }] : null,
    null,
    { revalidateIfStale: false, revalidateOnFocus: false },
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
