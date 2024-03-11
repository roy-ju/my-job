import useSWR from 'swr';

type JwtListResponse = {
  id: number;
  nickname: string;
  jwt: string;
}[];

export default function useFetchGetJwtList() {
  const { data, isLoading, mutate } = useSWR<JwtListResponse>('/jwt/list');
  return {
    data,
    isLoading,
    mutate,
  };
}
