import { atom, useRecoilValue } from 'recoil';
import { v1 } from 'uuid';

export interface UserState {
  user: {
    id: number;
    email: string;
    nickname: string;
    name: string;
  } | null;
  isLoading: boolean;
}

export const userState = atom<UserState>({
  key: `user/${v1()}`,
  default: {
    user: null,
    isLoading: false,
  },
});

export default function useUser() {
  return useRecoilValue(userState);
}
