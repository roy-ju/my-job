import { atom } from 'recoil';

import { v1 } from 'uuid';

export type FullScreenDialog = {
  id: string;
  body?: JSX.Element;
  onClose?: () => void;
  noAnimation?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
};

export type FullScreenDialogsAtom = {
  id: string;
  body?: JSX.Element;
  onClose?: () => void;
  noAnimation?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
};

const fullScreenDialogsAtom = atom<FullScreenDialogsAtom[]>({
  key: `full_screen_dialogs_atom/${v1()}`,
  default: [],
  dangerouslyAllowMutability: true,
});

export default fullScreenDialogsAtom;
