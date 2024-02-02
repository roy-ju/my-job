import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import verifyCiStatusAtom from '../atom/verifyCiStatus';

export default function useVerifyCiStatus() {
  const [state, setState] = useRecoilState(verifyCiStatusAtom);

  const updateVerifyCiStatus = useCallback(
    (value: '' | 'success') => {
      setState({
        status: value,
      });
    },
    [setState],
  );

  return {
    verifyStatus: state.status,
    updateVerifyCiStatus,
  };
}
