import { MouseEvent } from 'react';

import tw from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { TextFieldV2 } from '@/components/molecules';

import CloseContained from '@/assets/icons/close_contained.svg';

type ResetButtonProps = {
  render: boolean;
  prChange?: boolean;
  handleMouseDown: (e?: MouseEvent<HTMLButtonElement>) => void;
};

export default function ResetButton({ render, prChange = false, handleMouseDown }: ResetButtonProps) {
  if (!render) return null;

  return (
    <TextFieldV2.Trailing css={[prChange ? tw`pr-3` : tw`pr-4`]}>
      <ButtonV2 variant="ghost" onMouseDown={handleMouseDown} tw="p-0">
        <CloseContained />
      </ButtonV2>
    </TextFieldV2.Trailing>
  );
}
