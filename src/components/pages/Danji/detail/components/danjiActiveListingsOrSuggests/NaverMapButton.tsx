import React from 'react';

import { Button } from '@/components/atoms';

import NaverLogo from '@/assets/icons/naver_logo.svg';

type NaverMapButtonProps = {
  renderConditionNaverButton: boolean;
  openNaverRealestate: () => void;
};

export default function NaverMapButton({ renderConditionNaverButton, openNaverRealestate }: NaverMapButtonProps) {
  if (!renderConditionNaverButton) return null;

  return (
    <Button variant="outlined" tw="w-full" size="medium" onClick={openNaverRealestate}>
      <NaverLogo style={{ marginRight: '4px' }} />
      네이버 호가 확인하기
    </Button>
  );
}
