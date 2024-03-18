import useSWR from 'swr';

import { SubHomeGuideListResponse } from './types';

export default function useFetchSubHomeGuideList({ code }: { code: string }) {
  const { data, isLoading, mutate } = useSWR<SubHomeGuideListResponse>(['/subhome/guide/list', { code }]);

  return { data, middleCategoryList: data?.middle_category_list ?? [], list: data?.list ?? [], isLoading, mutate };
}
