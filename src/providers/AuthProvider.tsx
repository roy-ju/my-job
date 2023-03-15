import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import { userState } from '@/states/user';
import { useSetRecoilState } from 'recoil';
import { ReactNode, useEffect } from 'react';

export default function AuthProvider({ children }: { children?: ReactNode }) {
  const { data, isLoading } = useAPI_GetUserInfo({ revalidateIfStale: false, revalidateOnFocus: false });

  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (isLoading) {
      setUser({
        isLoading: true,
        user: null,
      });
    }

    if (!isLoading && data) {
      setUser({
        user: {
          id: data.ID,
          name: data.name,
          nickname: data.nickname,
          email: data.email,
        },
        isLoading: false,
      });
    }
  }, [data, isLoading, setUser]);

  return children as JSX.Element;
}
