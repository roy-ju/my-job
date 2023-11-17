import { useRouter } from 'next/router';
import useAPI_GetMySuggestRecommends from '@/apis/suggest/getMySuggestRecommends';
import useAPI_GetSuggestDetail from '@/apis/suggest/getSuggestDetail';

export default function useInit() {
  const router = useRouter();

  const { data: suggestDetailData, isLoading } = useAPI_GetSuggestDetail(Number(router?.query?.suggestID) ?? 0);

  const mySuggest = suggestDetailData?.my_suggest;
  const suggestID = suggestDetailData?.suggest_id ?? 0;

  const {
    data: suggestRecommendsData,
    count,
    mutate,
    increamentPageNumber,
    suggestStatus,
  } = useAPI_GetMySuggestRecommends(suggestID, undefined, mySuggest);

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
