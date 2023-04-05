import { atom } from 'recoil';

export type FullScreenDialog = {
  id: string;
  body?: JSX.Element;
  onClose?: () => void;
  noAnimation?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
};

export const fullScreenDialogs = atom<FullScreenDialog[]>({
  key: 'fullScreenDialogs',
  default: [],
});




