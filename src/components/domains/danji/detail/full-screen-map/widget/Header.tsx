import React from 'react';

import Button from '@/components/atoms/Button';

import { NavigationHeader } from '@/components/molecules';

import CloseIcon from '@/assets/icons/close_18.svg';

type HeaderProps = {
  name: string;
  handleClick: () => void;
};

export default function Header({ name, handleClick }: HeaderProps) {
  return (
    <NavigationHeader>
      <NavigationHeader.Title>{name}</NavigationHeader.Title>
      <Button variant="ghost" tw="p-0" onClick={handleClick}>
        <CloseIcon />
      </Button>
    </NavigationHeader>
  );
}
