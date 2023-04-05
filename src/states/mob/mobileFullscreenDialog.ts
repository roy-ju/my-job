import { atom } from 'recoil';

export type MobileFullScreenDialog = {
  id: string;
  body?: JSX.Element;
  onClose?: () => void;
  noAnimation?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
};

export const mobileFullScreenDialogs = atom<MobileFullScreenDialog[]>({
  key: 'fullScreenDialogs',
  default: [],
});




