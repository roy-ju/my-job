import { useEffect } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import FullScreenDialog from './FullScreenDialog';

type Props = {
  onChange: (active: boolean) => void;
};

const FullScreenDialogsContainer = styled.div`
  ${tw`absolute left-0 top-0 w-[100vw] h-[100%] [z-index: 1300]`}
`;

export default function FullScreenDialogs({ onChange }: Props) {
  const { dialogStates, closeFullScreenDialog, closeAll } = useFullScreenDialog();

  useEffect(() => {
    onChange(Boolean(dialogStates.length));
  }, [dialogStates.length, onChange]);

  const { pathname } = useRouter();

  useIsomorphicLayoutEffect(() => {
    closeAll();
  }, [pathname]);

  return (
    <FullScreenDialogsContainer id="fullScreenDialog-container">
      {dialogStates.map((dialog) => (
        <FullScreenDialog
          key={dialog.id}
          {...dialog}
          onClose={() => {
            dialog.onClose?.();
            closeFullScreenDialog(dialog.id);
          }}
        />
      ))}
    </FullScreenDialogsContainer>
  );
}
