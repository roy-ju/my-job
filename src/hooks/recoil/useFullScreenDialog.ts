import { fullScreenDialogs } from '@/states/fullscreenDialog';

import { nanoid } from 'nanoid';
import { useRecoilState } from 'recoil';

export type FullScreenDialog = {
  id: string;
  body?: JSX.Element;
  onClose?: () => void;
  noAnimation?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
};

export default function useFullScreenDialogStore() {
  const [dialogStates, setDialogStates] = useRecoilState(fullScreenDialogs);

  const addFullScreenDialog = (fullScreenDialog: Omit<FullScreenDialog, 'id'>) => {
    const id = nanoid();
    setDialogStates((prev) => [...prev, { id, ...fullScreenDialog }]);
  };

  const closeFullScreenDialog = (id: string) => {
    setDialogStates((prev) => prev.filter((v) => v.id !== id));
  };

  const closeAll = () => {
    setDialogStates(() => []);
  };

  return {
    dialogStates,
    addFullScreenDialog,
    closeFullScreenDialog,
    closeAll,
  };
}
