import { createContext } from 'react';

interface IPopupContext {
  isOpen?: boolean;
  onClick?: () => void;
  onCancel?: () => void;
  hasTwoButton?: true;
}

const PopupContext = createContext<IPopupContext>({});

export default PopupContext;
