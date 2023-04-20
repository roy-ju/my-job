import useSWR from 'swr';

export type CodeListResponse = {
  list:
    | [
        {
          name: string;
          code: string;
        },
      ]
    | null;
} & ErrorResponse;

export function useAPI_SidoList() {
  const { data, error } = useSWR<CodeListResponse>('/danji/sido/list', null, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}

export function useAPI_SigunguList({ sidoCode }: { sidoCode?: string | null }) {
  const { data, error } = useSWR<CodeListResponse>(
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
