import useSWR from 'swr';

export interface GetMostSuggestsResponse {
  list:
    | [
        {
          total_suggest_count: number;
          danji_id: number;
          pnu: string;
          realestate_type: number;
          eubmyundong: string;
          name: string;
          saedae_count: string;
          jeonyong_min: string;
          jeonyong_max: string;
          date: string;
          dong_count: string;
        },
      ]
    | null;
}

export default function useAPI_GetMostSuggests() {
  const { data, isLoading, mutate } = useSWR<GetMostSuggestsResponse>('/home/danjis/mostsuggests');

  return {
    data,
    isLoading,
    mutate,
  };
}
