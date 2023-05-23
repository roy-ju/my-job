import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

interface ISyncronizerState {
  unreadChatCount: number;
  unreadNotificationCount: number;
}

export const syncronizerState = atom<ISyncronizerState>({
  key: `syncronizer/${v1()}`,
  default: {
    unreadChatCount: 0,
    unreadNotificationCount: 0,
  },
});

export default function useSyncronizer() {
  const [state, setState] = useRecoilState(syncronizerState);

  const setUnreadChatCount = useCallback(
    (value: number) => {
      setState((prev) => ({ ...prev, unreadChatCount: value }));
    },
    [setState],
  );

  const setUnreadNotificationCount = useCallback(
    (value: number) => {
      setState((prev) => ({ ...prev, unreadNotificationCount: value }));
    },
    [setState],
  );

  return {
    ...state,
    setUnreadChatCount,
    setUnreadNotificationCount,
  };
}
