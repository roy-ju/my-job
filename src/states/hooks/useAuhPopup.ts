import { useCallback } from 'react';

import { useRecoilState, useResetRecoilState } from 'recoil';

import authPopupAtom from '../atom/authPopup';

import useReturnUrl from './useReturnUrl';

export default function useAuthPopup() {
  const [state, setState] = useRecoilState(authPopupAtom);

  const reset = useResetRecoilState(authPopupAtom);

  const { handleUpdateReturnUrl } = useReturnUrl();

  const closeAuthPopup = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, [setState]);

  const openAuthPopup = useCallback(
    (value: 'needVerify' | 'onlyLogin' | '') => {
      handleUpdateReturnUrl();
      setState((prev) => ({ ...prev, open: true, type: value }));
    },
    [handleUpdateReturnUrl, setState],
  );

  return {
    isOpenAuthPopup: state.open,
    authType: state.type,
    openAuthPopup,
    closeAuthPopup,
    resetAuthPopup: reset,
  };
}
