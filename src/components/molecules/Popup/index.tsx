import React, { ReactNode } from 'react';
import { Button } from '@/components/atoms';
import tw from 'twin.macro';
import ButtonGroup, { ButtonGroupProps } from '@/components/molecules/ButtonGroup';

interface PopupProps {
  children?: ReactNode;
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

const PopupCancelButton = tw(Button)`flex-1 rounded-t-none text-gray-1000 bg-gray-200 hover:bg-gray-400`;

const PopupActionButton = tw(Button)`flex-1 rounded-t-none bg-nego-800 hover:bg-nego-600`;

const PopupButtonGroup = tw(({ size = 'big', ...others }: ButtonGroupProps) => (
  <ButtonGroup size={size} {...others} />
))`w-full`;

/* Super Component */

function PopupMain({ children }: PopupProps) {
  return <div tw="w-[20rem]  bg-white shadow rounded-lg">{children}</div>;
}

const Popup = Object.assign(PopupMain, {
  Title: PopupTitle,
  Contents: PopupContents,
  ButtonGroup: PopupButtonGroup,
  ActionButton: PopupActionButton,
  CancelButton: PopupCancelButton,
});

export default Popup;
