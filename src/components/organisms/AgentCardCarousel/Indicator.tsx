import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import tw from 'twin.macro';

interface IndicatorProps {
  dataLength: number;
  currentIndex: number;
}

export default function Indicator({ dataLength, currentIndex }: IndicatorProps) {
  return (
    <div tw="flex mt-3 gap-1 justify-center">
      {Array(dataLength)
        .fill(0)
        .map((_, i) => (
          <div
            aria-label={`현재 ${i}`}
            tw="w-1.5 h-1.5 rounded-full"
            key={uuidv4()}
            css={[tw`bg-gray-400`, currentIndex === i && tw`bg-gray-1000`]}
          />
        ))}
    </div>
  );
}
