import useSWR from 'swr';

interface Response {
  total_unread_count: number;
}

export default function useAPI_GetUnreadNotificationCount() {
  const { data, mutate } = useSWR<Response>('/notification/unread/total');
  return {
    count: data?.total_unread_count ?? 0,
    mutate,
  };
}
