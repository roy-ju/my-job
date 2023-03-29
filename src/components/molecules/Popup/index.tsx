import React, { ReactNode, useContext, useMemo, useCallback } from 'react';
import { Button } from '@/components/atoms';
import { useControlled } from '@/hooks/utils';
import PopupContext from './PopupContext';

interface PopupProps {
  isOpen?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  onCancel?: () => void;
  hasTwoButton?: true;
}

type PopupSubComponentProps = Pick<PopupProps, 'children'>;

/* Text Components */

function PopupTitle({ children }: PopupSubComponentProps) {
  return <strong tw="font-bold text-h3">{children}</strong>;
}

function PopupContents({ children }: PopupSubComponentProps) {
  return <p tw="text-gray-700 text-info">{children}</p>;
}

/* Button Components */

function PopupCancelButton({ children }: PopupSubComponentProps) {
  const { onCancel: handleCancel } = useContext(PopupContext);

  return (
    <Button onClick={handleCancel} variant="ghost" size="big" tw="rounded-none">
      {children}
    </Button>
  );
}

function PopupActionButton({ children }: PopupSubComponentProps) {
  const { onClick: handleClick, hasTwoButton } = useContext(PopupContext);

  if (hasTwoButton) {
    return (
      <Button onClick={handleClick} variant="secondary" size="big" tw="rounded-none rounded-br-lg">
        {children}
      </Button>
    );
  }
  return (
    <Button onClick={handleClick} variant="secondary" size="big" tw="rounded-none rounded-b-lg">
      {children}
    </Button>
  );
}

/* Super Component */

function PopupMain({ isOpen: isOpenProp, children, onClick, onCancel, hasTwoButton }: PopupProps) {
  const [isOpen, setIsOpen] = useControlled({ controlled: isOpenProp, default: false });

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen, onCancel]);

  const context = useMemo(
    () => ({ onCancel: handleCancel, onClick, hasTwoButton, isOpen }),
    [handleCancel, onClick, hasTwoButton, isOpen],
  );

  //if (!isOpen) return null;

  return (
    <PopupContext.Provider value={context}>
      <div tw="min-w-[20rem]  bg-white shadow-[20px_32px_56px_rgba(0,0,0,0.1)] rounded-lg">{children}</div>
    </PopupContext.Provider>
  );
}

export const Popup = Object.assign(PopupMain, {
  Title: PopupTitle,
  Contents: PopupContents,
  ActionButton: PopupActionButton,
  CancelButton: PopupCancelButton,
});
