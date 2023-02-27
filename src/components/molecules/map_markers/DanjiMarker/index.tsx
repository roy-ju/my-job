import React from 'react';
import { Numeral } from '@/components/atoms';
import tw from 'twin.macro';
import MarkerTail from '../assets/marker_tail.svg';
import MarkerRoundedCorner from '../assets/marker_rounded_corner.svg';
import variants, { VariantKey } from '../variants';

export default React.memo(
  ({
    variant,
    area,
    price,
    count,
  }: {
    variant: VariantKey;
    area: number;
    price: number;
    count: number;
  }) => (
    <div tw="w-fit relative min-w-[3rem]">
      <div tw="flex flex-col h-[54px] rounded-lg">
        <div tw="flex">
          <div
            css={[
              tw`relative h-[23px] bg-white pl-2 pr-3 flex flex-1 items-center justify-start rounded-tl-lg`,
              count === 0 && tw`rounded-tr-lg`,
            ]}
          >
            {count !== 0 && (
              <div
                css={[
                  tw`bg-white absolute left-px top-px w-full h-full z-[-1] rounded-tl-lg`,
                  count === 0 && tw`rounded-tr-lg`,
                ]}
              />
            )}
            <Numeral
              css={[
                tw`text-[10px] leading-[10px]`,
                { color: variants[variant].textColor },
              ]}
              suffix="평"
            >
              {area}
            </Numeral>
          </div>
          {count !== 0 && (
            <div tw="relative">
              <div tw="absolute w-full h-[2px] left-0 bottom-[-1px] bg-white z-[-1]" />
              <MarkerRoundedCorner />
              <div tw="absolute top-[-8px] left-[12px] text-info text-white font-bold bg-black px-2 h-5 rounded-[40px] shadow-[0px_8px_12px_rgba(0, 0, 0, 0.08)]">
                {count}
              </div>
            </div>
          )}
        </div>
        <div
          css={[
            tw`flex items-center justify-start flex-1 pl-2 pr-3 rounded-br-lg shadow-[0px_8px_12px_rgba(0, 0, 0, 0.08)]`,
            { backgroundColor: variants[variant].bgColor },
          ]}
        >
          <Numeral tw="text-b2 text-white font-bold" koreanNumber falsy="-">
            {price}
          </Numeral>
        </div>
      </div>
      <div style={{ transform: 'translateY(-1px)' }}>
        <MarkerTail color={variants[variant].bgColor} />
      </div>
      <div
        css={[
          tw`rounded-b-lg`,
          {
            zIndex: -1,
            position: 'absolute',
            bottom: '8px',
            left: '0px',
            height: '2px',
            width: '90%',
            boxShadow: '3px 3px 6px 1px rgba(0,0,0,0.5)',
          },
        ]}
      />
    </div>
  ),
);
