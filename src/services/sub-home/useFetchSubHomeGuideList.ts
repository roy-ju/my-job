import useSWR from 'swr';

import { SubHomeGuideListResponse } from './types';

export default function useFetchSubHomeGuideList({ code }: { code: string }) {
  const { data, isLoading, mutate } = useSWR<SubHomeGuideListResponse>(['/subhome/guide/list', { code }], null, {
    revalidateOnFocus: false,
  });

  return {
    data,
    middleCategoryList: data?.middle_category_list ?? [],
    list: data?.list ?? [],
    additionalList: data?.additional_list ?? [],
    requiredList: data?.required_list ?? [],
    isLoading,
    mutate,
  };
}
