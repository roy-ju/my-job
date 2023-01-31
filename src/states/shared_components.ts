import produce from 'immer';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

// 공통컴포넌트/고유컴포넌트 상태관리
type SharedComponentsState = {
  [componentKey: string]:
    | {
        [depth: number]: boolean;
      }
    | undefined;
};

export const sharedComponentsState = atom<SharedComponentsState>({
  key: `shared_components_state/${v1()}`,
  default: {},
});

export default function useSharedComponents() {
  const [state, setState] = useRecoilState(sharedComponentsState);

  const registerKey = useCallback(
    (key: string, currentDepth: number) => {
      setState((currentState) =>
        produce(currentState, (newState) => {
          if (newState[key]) {
            newState[key]![currentDepth] = true;
          } else {
            newState[key] = { [currentDepth]: true };
          }
        }),
      );
    },
    [setState],
  );

  const unregisterKey = useCallback(
    (key: string, currentDepth: number) => {
      setState((currentState) =>
        produce(currentState, (newState) => {
          if (newState[key]) {
            delete newState[key]![currentDepth];
            if (Object.keys(newState[key]!).length === 0) {
              delete newState[key];
            }
          }
        }),
      );
    },
    [setState],
  );

  const doesKeyExistInPreviousDepth = useCallback(
    (key: string, currentDepth: number) => {
      const depths = state[key];
      if (!depths) return false;
      let exist = false;
      Object.keys(depths).forEach((depth) => {
        if (Number(depth) < currentDepth) {
          exist = true;
        }
      });
      return exist;
    },
    [state],
  );

  return {
    registerKey,
    unregisterKey,
    doesKeyExistInPreviousDepth,
  };
}
