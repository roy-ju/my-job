import { Button } from '@/components/atoms';
import React from 'react';

interface Props {
  sido: string;
  sigungu?: string;
  eubmyundong?: string;
}

function MapPositionBar({ sido, sigungu, eubmyundong }: Props) {
  return (
    <div tw="inline-flex bg-white rounded-[30px] shadow-[0px 8px 16px rgba(0, 0, 0, 0.14)] items-center">
      <Button variant="outlined" size="medium" tw="whitespace-nowrap rounded-[30px] border-white">
        {sido}
      </Button>
      {sigungu && (
        <>
          <div tw="w-[1px] h-4 bg-gray-300" />
          <Button variant="outlined" size="medium" tw="whitespace-nowrap rounded-[30px] border-white">
            {sigungu}
          </Button>
        </>
      )}
      {eubmyundong && (
        <>
          <div tw="w-[1px] h-4 bg-gray-300" />
          <Button variant="outlined" size="medium" tw="whitespace-nowrap rounded-[30px] border-white">
            {eubmyundong}
          </Button>
        </>
      )}
    </div>
  );
}

export default MapPositionBar;
