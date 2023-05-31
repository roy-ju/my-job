import useSWR from 'swr';

type GetJwtListResponse = {
  id: number;
  nickname: string;
  jwt: string;
}[];

export default function useAPI_GetJwtList() {
  const { data, isLoading, mutate } = useSWR<GetJwtListResponse>('/jwt/list');
  return {
    data,
    isLoading,
    mutate,
  };
}
