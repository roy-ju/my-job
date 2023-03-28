import { createContext } from 'react';

interface IPopupContext {
  closePopup: () => void;
  onClick?: () => void;
  variant?: 'twinButton' | undefined;
}

const PopupContext = createContext<IPopupContext>({ closePopup: () => {} });

export default PopupContext;
