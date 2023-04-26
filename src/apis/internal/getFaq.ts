import axios from 'axios';
import useSWR from 'swr';

function fetcher(arg: string | [string, any]) {
  if (typeof arg === 'string') {
    return axios.get(arg).then((res) => res.data);
  }
  return axios.get(arg[0], arg[1]).then((res) => res.data);
}

export type GetFaqListResponse = {
  a: string;
  q: string;
}[];

export default function useAPI_Internal_GetFaqList(category: string) {
  const { data, isLoading, mutate } = useSWR<GetFaqListResponse>(`/api/faq?category=${category}`, fetcher);
  return {
    data,
    isLoading,
    mutate,
  };
}
