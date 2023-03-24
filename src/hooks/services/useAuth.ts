import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import { useCallback, useMemo } from 'react';
import { mutate } from 'swr';

export default function useAuth() {
  const {
    data,
    isLoading,
    mutate: mutateBase,
  } = useAPI_GetUserInfo({ revalidateIfStale: false, revalidateOnFocus: false });

  const user = useMemo(
    () =>
      data
        ? {
            id: data.ID,
            name: data.name,
            nickname: data.nickname,
            email: data.email,
            phone: data.phone,
          }
        : null,
    [data],
  );

  const mutateUser = useCallback(() => {
    mutate(() => true, undefined, false);
    mutateBase();
  }, [mutateBase]);

  return useMemo(() => ({ user, isLoading, mutate: mutateUser }), [user, mutateUser, isLoading]);
}
