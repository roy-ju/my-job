/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { FullScreenDialog as FullScreenDialogProps } from '@/states/atom/dialog';

import useFullScreenDialog from '@/states/hooks/useFullScreenDialog';

import { useScrollLock } from '@/hooks/utils/useScrollLock';

import { useIsomorphicLayoutEffect } from '@/hooks/utils';

import MobileGlobalStyles from '@/styles/MobileGlobalStyles';

type Props = {
  onChange: (active: boolean) => void;
};

function Container({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      tw="fixed top-0 left-0 bottom-0 w-[100vw] h-[100%] overflow-hidden [z-index: 1300] pointer-events-none bg-transparent"
      id="overlay-container"
    >
      {children}
    </div>
  );
}

function Backdrop() {
  return <div tw="absolute pointer-events-none left-0 top-0 w-[100vw] h-[100%] [z-index: -1]" />;
}

function FullScreenDialog({ body, onClose }: FullScreenDialogProps) {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <div tw="absolute w-[100vw] h-[100%] [z-index: 1300]">
      <div tw="absolute w-[100vw] h-[100%] overflow-y-scroll overflow-x-hidden pointer-events-auto">
        <div tw="relative w-[100vw] h-[100%]">
          <div tw="pointer-events-auto  overflow-x-hidden w-full min-h-[100%] my-0 mx-auto bg-white">
            {body && React.cloneElement(body, { onClose: handleClose })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FullScreenDialogs({ onChange }: Props) {
  const { dialogStates, closeFullScreenDialog, closeAll } = useFullScreenDialog();

  useEffect(() => {
    onChange(Boolean(dialogStates.length));
  }, [dialogStates.length, onChange]);

  const { pathname } = useRouter();

  useIsomorphicLayoutEffect(() => {
    closeAll();
  }, [pathname]);

  return (
    <div tw="absolute left-0 top-0 w-[100vw] h-[100%] [z-index: 1300]" id="fullScreenDialog-container">
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
    </div>
  );
}

export default function OverlayContainer() {
  const [dialogsActive, setDialogsActive] = useState(false);

  const onDialogsChange = useCallback((active: boolean) => {
    setDialogsActive(active);
  }, []);

  useScrollLock(dialogsActive);

  return (
    <>
      <MobileGlobalStyles />
      <Container>
        <Backdrop />
        <FullScreenDialogs onChange={onDialogsChange} />
      </Container>
    </>
  );
}
