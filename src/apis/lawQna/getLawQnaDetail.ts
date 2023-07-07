import useSWR from 'swr';

export interface GetLawQnaDetailResponse {
  id: number;
  mine: boolean;
  liked: boolean;
  title: string;
  user_message: string;
  user_nickname: string;
  created_time: string;
  admin_message: string;
  admin_updated_time: string;
  like_count: number;
  prev:
    | {
        id: number;
        title: string;
      }
    | null;
  next:
    | {
        id: number;
        title: string;
      }
    | null;
}

export default function useAPI_GetLawQnaDetail(id?: number) {
  const { data, isLoading, mutate } = useSWR<GetLawQnaDetailResponse & ErrorResponse>(
    id ? ['/lawqna/get', { law_qna_id: id }] : null,
  );

  return { data, isLoading, mutate };
}
