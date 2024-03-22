import useSWR from 'swr';

import { GuideListItem, SubHomeDashInfoResponse, TermsDictionaryListItem } from './types';

export default function useFetchSubHomeDashboardInfo() {
  const { data, isLoading, mutate } = useSWR<SubHomeDashInfoResponse>(['/subhome/dashboard/info'], null, {
    revalidateOnFocus: false,
  });

  function mapToGuideList(termDictionaryList: TermsDictionaryListItem[]): GuideListItem[] {
    return termDictionaryList.map((item) => ({
      id: item.term_dictionary.id,
      code: item.term_dictionary.code,
      name: item.term_dictionary.name,
      parent_id: item.term_dictionary.parent_id,
      content: item.term_dictionary.content,
      additional_explanation: item.term_dictionary.additional_explanation,
      tip: item.term_dictionary.tip,
      warning: item.term_dictionary.warning,
      related_terms_ids: item.term_dictionary.related_terms_ids,
      order_num: item.term_dictionary.order_num,
      created_time: item.term_dictionary.created_time,
      children: item.term_dictionary.children,
      related_terms: item.related_terms,
    }));
  }

  return {
    data,
    list1: data?.realestate_knowledge_list ?? [],
    list2: mapToGuideList(data?.term_dictionary_list ?? []),
    isLoading,
    mutate,
  };
}
