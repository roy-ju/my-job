import { PopupStateType } from '@/types/popups';

import { ReactNode, createContext, useContext, useState, SetStateAction, Dispatch } from 'react';

export const PopupStateContext = createContext<PopupStateType>('');

export const PopupDispatchContext = createContext<Nullable<Dispatch<SetStateAction<PopupStateType>>>>(null);

export default function Provider({ children }: { children: ReactNode }) {
  const [popup, setPopup] = useState<PopupStateType>('');

  return (
    <PopupStateContext.Provider value={popup}>
      <PopupDispatchContext.Provider value={setPopup}>{children}</PopupDispatchContext.Provider>
    </PopupStateContext.Provider>
  );
}

export function usePopupStore() {
  return useContext(PopupStateContext);
}

export function usePopupDisaptchStore() {
  return useContext(PopupDispatchContext);
}
