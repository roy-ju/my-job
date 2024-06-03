import axios from 'axios';

import useSWR from 'swr';

function fetcher(arg: string | [string, any]) {
  if (typeof arg === 'string') {
    return axios.get(arg).then((res) => res.data);
  }
  return axios.get(arg[0], arg[1]).then((res) => res.data);
}

export type InternalFaqListResponse = {
  [category: string]: {
    q: string;
    a: string;
  }[];
};

export default function useFetchInternalFaqList() {
  const { data, isLoading, mutate } = useSWR<InternalFaqListResponse>(`/api/faq`, fetcher);

  return {
    data,
    isLoading,
    mutate,
  };
}
