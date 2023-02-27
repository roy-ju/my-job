import React from 'react';
import { Numeral } from '@/components/atoms';
import tw from 'twin.macro';
import MarkerRoundedCorner from '../assets/marker_rounded_corner.svg';
import MarkerTail from '../assets/marker_tail.svg';

type Props = {
  /** 금액 */
  price: number;
  /** 매물수 */
  count: number;
};

export default React.memo(({ price, count = 0 }: Props) => (
  <div tw="relative w-fit">
    {/* Content */}
    <div tw="min-w-[2.5rem] h-[46px] flex items-center justify-start pl-2 pr-3 pb-2">
      <Numeral koreanNumberShort tw="text-b2 text-white font-bold leading-none">
        {price}
      </Numeral>
    </div>
    {/* Background */}
    <div css={[tw`absolute top-0 left-0 flex flex-col w-full h-full z-[-1]`]}>
      <div tw="relative text-nego flex">
        <div
          css={[
            tw`flex-1 bg-nego rounded-tl-lg h-[23px]`,
            count === 0 && tw`rounded-tr-lg`,
          ]}
        />
        <div tw="absolute left-0 bottom-[-1px] z-[-1] w-full h-[2px] bg-nego" />
        {/* Listing Count */}
        {count !== 0 && (
          <>
            <div tw="absolute top-0 right-[23px] h-full w-[2px] bg-nego" />
            <div tw="relative">
              <MarkerRoundedCorner />
              <div tw="absolute h-5 px-2 top-[-8px] left-[12px] rounded-[40px] bg-black text-white text-info font-bold">
                {count}
              </div>
            </div>
          </>
        )}
      </div>
      <div tw="flex-1 bg-nego rounded-br-lg" />
      <div tw="text-nego" style={{ transform: 'translateY(-1px)' }}>
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
));
