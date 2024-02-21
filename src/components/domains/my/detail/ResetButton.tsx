import { MouseEvent } from 'react';

import tw from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { TextFieldV2 } from '@/components/molecules';

import CloseContained from '@/assets/icons/close_contained.svg';

type ResetButtonProps = {
  render: boolean;
  handleMouseDown: (e?: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default function ResetButton({ render, disabled, handleMouseDown }: ResetButtonProps) {
  if (!render) return null;

  return (
    <TextFieldV2.Trailing tw="pr-3">
      <ButtonV2 variant="ghost" onMouseDown={handleMouseDown} tw="p-0" disabled={disabled}>
        <CloseContained />
      </ButtonV2>
    </TextFieldV2.Trailing>
  );
}
