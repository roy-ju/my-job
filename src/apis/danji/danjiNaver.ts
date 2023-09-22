import useSWR from 'swr';

export type GetDanjiNaverResponse = {
  outlink_pc: string;
  outlink_mobile: string;
} & ErrorResponse;

export function useAPI_GetDanjiNaver({ danjiId }: { danjiId?: number | null }) {
  const { data, error, mutate } = useSWR<GetDanjiNaverResponse>(
    danjiId ? ['/danji/naver/complex/outlink', { danji_id: danjiId }] : null,
    null,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnMount: true,
    },
  );

  return {
    mobileNaverURL: data?.outlink_mobile,
    pcNaverURL: data?.outlink_pc,
    isLoading: danjiId ? !data && !error : false,
    mutate,
    error,
  };
}
