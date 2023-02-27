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
    count = 0,
  }: {
    variant: VariantKey;
    area: number;
    price: number;
    count: number;
  }) => (
    <div tw="relative w-fit">
      {/* Content */}
      <div tw="min-w-[3rem] h-[62px] pb-2 flex flex-col">
        <div
          css={[
            tw`h-[23px] flex items-center justify-start pl-2`,
            count !== 0 && tw`pr-6`,
          ]}
        >
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
        <div tw="flex flex-1 items-center justify-start pl-2 pr-3">
          <Numeral tw="text-b2 text-white font-bold" koreanNumber falsy="-">
            {price}
          </Numeral>
        </div>
      </div>
      {/* Background */}
      <div tw="absolute top-0 left-0 flex flex-col w-full h-full z-[-1]">
        <div tw="relative flex">
          <div
            css={[
              tw`flex-1 h-[23px] bg-white rounded-tl-lg`,
              count === 0 && tw`rounded-tr-lg`,
            ]}
          />
          <div tw="absolute left-0 bottom-0 w-full h-[2px] bg-white" />
          {count !== 0 && (
            <>
              <div tw="absolute top-0 right-[23px] h-[23px] w-[2px] bg-white" />
              <div tw="relative">
                <MarkerRoundedCorner color="#FFF" />
                <div tw="absolute h-5 px-2 top-[-8px] left-[12px] rounded-[40px] bg-black text-white text-info font-bold">
                  {count}
                </div>
              </div>
            </>
          )}
        </div>
        <div
          css={[
            tw`flex-1 rounded-br-lg`,
            { backgroundColor: variants[variant].bgColor },
          ]}
        />
        <div
          css={{ color: variants[variant].bgColor }}
          style={{ transform: 'translateY(-1px)' }}
        >
          <MarkerTail />
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
              boxShadow: '1px 3px 6px 1px rgba(0,0,0,0.5)',
            },
          ]}
        />
      </div>
    </div>
  ),
);
