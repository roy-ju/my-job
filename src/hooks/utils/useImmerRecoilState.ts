import { RecoilState, useRecoilState } from 'recoil';

import { produce } from 'immer';
import { useCallback } from 'react';

export default function useImmerRecoilState<T>(atom: RecoilState<T>) {
  const [state, setState] = useRecoilState(atom);

  const setImmerState = useCallback(
    (func: (draft: T) => void) => {
      setState((currentState) => produce(currentState, func));
    },
    [setState],
  );

  return [state, setImmerState] as const;
}
