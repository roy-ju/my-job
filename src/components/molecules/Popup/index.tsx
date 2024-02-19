import React, { ReactNode } from 'react';

import tw from 'twin.macro';

import { Button } from '@/components/atoms';

import ButtonGroup, { ButtonGroupProps } from '@/components/molecules/ButtonGroup';

import useCheckPlatform from '@/hooks/useCheckPlatform';

interface PopupProps {
  children?: ReactNode;
  type?: 'normal' | 'large';
}

/* Text Components */

const PopupTitleSmall = tw.strong`font-bold text-b2`;

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

function PopupMain({ children, type = 'normal' }: PopupProps) {
  const { platform } = useCheckPlatform();

  if (type === 'large')
    return (
      <div
        tw="[max-width: 380px] rounded-lg px-5"
        css={platform === 'pc' ? tw`[max-width: 380px]` : tw`[max-width: 340px]`}
      >
        {children}
      </div>
    );

  return <div tw="w-[20rem] shadow rounded-lg">{children}</div>;
}

const Popup = Object.assign(PopupMain, {
  SmallTitle: PopupTitleSmall,
  Title: PopupTitle,
  SubTitle: PopupSubTitle,
  Body: PopupBody,
  ContentGroup: PopupContentGroup,
  ButtonGroup: PopupButtonGroup,
  ActionButton: PopupActionButton,
  CancelButton: PopupCancelButton,
});

export default Popup;
