import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import syncronizerAtom from '../atom/syncronizer';

export default function useSyncronizer() {
  const [state, setState] = useRecoilState(syncronizerAtom);

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
