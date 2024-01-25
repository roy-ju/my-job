import React from 'react';

import CloseIcon from '@/assets/icons/close_12.svg';

import { NavigationHeader } from '@/components/molecules';

type RegisterHeaderProps = {
  onClickClose: () => void;
};

export default function RegisterHeader({ onClickClose }: RegisterHeaderProps) {
  return (
    <NavigationHeader>
      <button type="button" tw="ml-auto" onClick={onClickClose}>
        <CloseIcon />
      </button>
    </NavigationHeader>
  );
}
