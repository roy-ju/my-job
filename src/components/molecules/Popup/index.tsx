import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';
import { createPortal } from 'react-dom';
import { Button } from '../../atoms';
import PopupContext from './PopupContext';

interface PopupProps {
  children?: ReactNode;
  onChange?: () => void;
  variant?: 'twinButton' | undefined;
}

type PopupSubComponentProps = Pick<PopupProps, 'children'>;

/* Text Components */

function PopupTextWrapper({ children }: PopupSubComponentProps) {
  if (children && Array.isArray(children)) {
    return <div css={tw`px-5 py-6`}>{children}</div>;
  }

  return <div css={tw`px-5 py-12 font-sans text-center`}>{children}</div>;
}

function PopupTitle({ children }: PopupSubComponentProps) {
  return <div css={tw`font-bold text-h3`}>{children}</div>;
}

function PopupContents({ children }: PopupSubComponentProps) {
  return <div css={tw`text-gray-700 text-info`}>{children}</div>;
}

/* Button Components */

function PopupButtonWrapper({ children }: PopupSubComponentProps) {
  if (Array.isArray(children)) {
    return <div css={tw`grid grid-cols-2`}>{children}</div>;
  }

  return <div css={tw`grid`}>{children}</div>;
}

function PopupCancelButton({ children }: PopupSubComponentProps) {
  const { closePopup } = useContext(PopupContext);

  return (
    <Button onClick={closePopup} variant="gray" size="big" tw="bg-[#FFCD4E]/[.3] hover:bg-[#FFCD4E]/[.2] rounded-none">
      {children}
    </Button>
  );
}

function PopupConfirmButton({ children }: PopupSubComponentProps) {
  const { onClick: handleClick, variant } = useContext(PopupContext);

  if (variant === 'twinButton') {
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

function PopupCustomButton({ children }: PopupSubComponentProps) {
  const { onClick: handleClick, variant } = useContext(PopupContext);

  if (variant === 'twinButton') {
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

function PopupMain({ children, onChange, variant }: PopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCSR, setIsCSR] = useState(false);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  const closePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const context = useMemo(() => ({ onChange, closePopup, variant }), [onChange, closePopup, variant]);

  if (!isOpen) return null;
  if (!isCSR) return null;

  return createPortal(
    <PopupContext.Provider value={context}>
      <div css={tw`absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}>
        <div css={tw`min-w-[20rem] shadow-[20px_32px_56px_rgba(0,0,0,0.1)] rounded-lg`}>{children}</div>
      </div>
    </PopupContext.Provider>,
    document.body,
  );
}

export const Popup = Object.assign(PopupMain, {
  Title: PopupTitle,
  Contents: PopupContents,
  TextWrapper: PopupTextWrapper,
  ConfirmButton: PopupConfirmButton,
  CancelButton: PopupCancelButton,
  CustomButton: PopupCustomButton,
  ButtonWrapper: PopupButtonWrapper,
});
