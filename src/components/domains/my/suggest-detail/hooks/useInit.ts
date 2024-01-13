import { useRouter } from 'next/router';

import useFetchSuggestDetail from '@/services/suggests/useFetchSuggestDetail';

import useFetchMySuggestRecommends from '@/services/my/useFetchMySuggestRecommends';

export default function useInit() {
  const router = useRouter();

  const { data: suggestDetailData, isLoading } = useFetchSuggestDetail({
    suggestID: Number(router?.query?.suggestID) ?? 0,
  });

  const mySuggest = suggestDetailData?.my_suggest;

  const suggestID = suggestDetailData?.suggest_id ?? 0;

  const {
    data: suggestRecommendsData,
    count,
    mutate,
    increamentPageNumber,
    suggestStatus,
  } = useFetchMySuggestRecommends(suggestID, undefined, mySuggest);

  return {
    isLoading,
    suggestDetailData,
    suggestRecommendsData,
    count,
    suggestStatus,
    mutate,
    onNext: increamentPageNumber,
  };
}
