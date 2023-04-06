import { atom } from 'recoil';

import { v1 } from 'uuid';

export type MobileFullScreenDialog = {
  id: string;
  body?: JSX.Element;
  onClose?: () => void;
  noAnimation?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
};

export const mobileFullScreenDialogs = atom<MobileFullScreenDialog[]>({
  key: `fullScreenDialogs${v1}`,
  default: [],
  dangerouslyAllowMutability: true,
});




