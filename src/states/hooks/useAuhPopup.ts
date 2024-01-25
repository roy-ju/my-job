import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import authPopupAtom from '../atom/authPopup';

export default function useAuthPopup() {
  const [state, setState] = useRecoilState(authPopupAtom);

  const openAuthPopup = useCallback(
    (value: 'needVerify' | 'onlyLogin' | '') => {
      setState(() => ({ type: value, open: true }));
    },
    [setState],
  );

  const closeAuthPopup = useCallback(() => {
    setState((prev) => ({ type: prev.type, open: false }));
  }, [setState]);

  return {
    isOpenAuthPopup: state.open,
    authType: state.type,
    openAuthPopup,
    closeAuthPopup,
  };
}
