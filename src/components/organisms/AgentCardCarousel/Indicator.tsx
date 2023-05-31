import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import tw from 'twin.macro';

interface IndicatorProps {
  dataLength: number;
  currentIndex: number;
  handleIndicator: (e: React.MouseEventHandler<HTMLButtonElement>, index: number) => () => void;
}

export default function Indicator({ dataLength, currentIndex, handleIndicator }: IndicatorProps) {
  return (
    <div tw="flex mt-3 gap-1 justify-center">
      {Array(dataLength)
        .fill(0)
        .map((_, i) => (
          <button
            type="button"
            aria-label={`현재 ${i}번 슬라이드. ${i}번 슬라이드로 이동하기 버튼`}
            tw="w-1.5 h-1.5 rounded-full"
            key={uuidv4()}
            css={[tw`bg-gray-400`, currentIndex === i && tw`bg-gray-1000`]}
            onClick={handleIndicator(_, i)}
          />
        ))}
    </div>
  );
}
