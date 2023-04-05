import useSWR from 'swr';

export type GetSidoListResponse = {
  list:
    | [
        {
          name: string;
          code: string;
        },
      ]
    | null;
} & ErrorResponse;

export function useMapSidoList() {
  const { data, error } = useSWR<GetSidoListResponse>('/danji/sido/list', null, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
