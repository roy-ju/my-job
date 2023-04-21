import React from 'react';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';
import { Information } from '@/components/molecules';
import { Button } from '@/components/atoms';

interface Props {
  listType: string;
}

export default function NoData({ listType }: Props) {
  return (
    <Information>
      <div tw="flex flex-col gap-4 items-center text-center mb-5">
        <ExclamationMark />
        <Information.Title>관심 {listType === '매물' ? `매물이` : `단지가`} 없습니다.</Information.Title>
        <Information.Contents>
          네고시오에서 진행되고 있는 거래를 찾아
          <br />
          온라인으로 바로 네고를 시작해보세요
        </Information.Contents>
      </div>
      <Button size="medium" tw="block mx-auto" variant="primary">
        {listType} 검색하기
      </Button>
    </Information>
  );
}
