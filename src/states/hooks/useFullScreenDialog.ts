import { useRecoilState } from 'recoil';

import { nanoid } from 'nanoid';

import fullScreenDialogsAtom, { FullScreenDialog } from '../atom/dialog';

export default function useFullScreenDialog() {
  const [dialogStates, setDialogStates] = useRecoilState(fullScreenDialogsAtom);

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
