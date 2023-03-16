import { getUserInfo } from '@/apis/user/getUserInfo';
import { userState } from '@/states/user';
import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

export default function useAuth() {
  const [state, setState] = useRecoilState(userState);

  const mutateUser = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const data = await getUserInfo();
    setState({
      user: data
        ? {
            id: data.ID,
            name: data.name,
            nickname: data.nickname,
            email: data.email,
          }
        : null,
      isLoading: false,
    });
  }, [setState]);

  return useMemo(() => ({ ...state, mutateUser }), [state, mutateUser]);
}
