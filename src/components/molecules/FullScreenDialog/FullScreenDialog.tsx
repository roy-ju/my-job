import React, { useCallback } from 'react';

import tw, { styled } from 'twin.macro';

import { FullScreenDialog as FullScreenDialogProps } from '@/states/atom/dialog';

export const FullScreenDialogContainer = styled.div`
  ${tw`absolute w-[100vw] h-[100%] [z-index: 1300]`}
`;

export const FullScreenDialogWrraper = styled.div`
  ${tw`absolute w-[100vw] h-[100%] overflow-y-scroll overflow-x-hidden pointer-events-auto`}
`;

export const FullScreenDialogBodyWrraper = styled.div`
  ${tw`relative w-[100vw] h-[100%]`}
`;

export const FullScreenDialogBody = styled.div`
  ${tw`pointer-events-auto  overflow-x-hidden w-full min-h-[100%] my-0 mx-auto bg-white`}
`;

export const FullScreenDialogsContainer = styled.div`
  ${tw`absolute left-0 top-0 w-[100vw] h-[100%] [z-index: 1300]`}
`;

export default function FullScreenDialog({ body, onClose }: FullScreenDialogProps) {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <FullScreenDialogContainer>
      <FullScreenDialogWrraper>
        <FullScreenDialogBodyWrraper>
          <FullScreenDialogBody>{body && React.cloneElement(body, { onClose: handleClose })}</FullScreenDialogBody>
        </FullScreenDialogBodyWrraper>
      </FullScreenDialogWrraper>
    </FullScreenDialogContainer>
  );
}
