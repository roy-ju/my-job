import React, { ReactNode } from 'react';
import { Button } from '@/components/atoms';
import tw from 'twin.macro';
import ButtonGroup, { ButtonGroupProps } from '@/components/molecules/ButtonGroup';

interface PopupProps {
  children?: ReactNode;
}

/* Text Components */

const PopupTitle = tw.strong`font-bold text-h3`;

const PopupSubTitle = tw.strong`font-bold text-b2`;

const PopupBody = tw.p`text-gray-700 text-info`;

const PopupContentGroup = tw.div`px-5 py-6 flex flex-col gap-4 bg-white rounded-t-lg`;

/* Button Components */

const PopupCancelButton = tw(Button)`border-none flex-1 rounded-t-none text-gray-1000 bg-gray-200 hover:bg-gray-400`;

const PopupActionButton = tw(Button)`border-none flex-1 rounded-t-none bg-nego-800 hover:bg-nego-600`;

const PopupButtonGroup = tw(({ size = 'big', ...others }: ButtonGroupProps) => (
  <ButtonGroup size={size} {...others} />
))`w-full`;

/* Super Component */

function PopupMain({ children }: PopupProps) {
  return <div tw="w-[20rem] shadow rounded-lg">{children}</div>;
}

const Popup = Object.assign(PopupMain, {
  Title: PopupTitle,
  SubTitle: PopupSubTitle,
  Body: PopupBody,
  ContentGroup: PopupContentGroup,
  ButtonGroup: PopupButtonGroup,
  ActionButton: PopupActionButton,
  CancelButton: PopupCancelButton,
});

export default Popup;
