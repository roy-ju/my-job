import { ReactNode, useReducer, createContext } from 'react';

import { suggestFormReducer, initialState } from '../reducer';

import { State, Action } from '../reducer/types';

export const FormContext = createContext<State | null>(null);

export const FormDispatchContext = createContext<React.Dispatch<Action> | null>(null);

export default function Provider({ children }: { children: ReactNode }) {
  const [value, dispatch] = useReducer(suggestFormReducer, initialState);

  return (
    <FormContext.Provider value={value}>
      <FormDispatchContext.Provider value={dispatch}>{children}</FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}
