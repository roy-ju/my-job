import React, { MouseEventHandler, ReactNode } from 'react';

import tw from 'twin.macro';

import { Numeral } from '@/components/atoms';

import MarkerRoundedCorner from '../assets/marker_rounded_corner.svg';

import MarkerTail from '../assets/marker_tail.svg';

interface Props {
  selected?: boolean;

  /** 금액 */
  price: number;
  /** 매물수 */
  count: number;
  /** 마커 클릭 이벤트 핸들러 */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  children?: ReactNode;
}

const ListingMarker = React.memo(({ selected = false, price, count = 0, children, onClick }: Props) => (
  <div tw="relative animate-scale will-change-transform [text-rendering: optimizeSpeed] inline-block w-fit">
    <div css={selected && tw`animate-bounce`}>
      {children && <div tw="absolute left-1/2 top-[-8px] translate-y-[-100%] translate-x-[-50%]">{children}</div>}
      <button type="button" tw="relative w-fit" onClick={onClick}>
        {/* Content */}
        <div tw="min-w-[2.5rem] h-[46px] flex items-center justify-start pl-2 pr-3 pb-2">
          <Numeral koreanNumberShort tw="text-b2 text-white font-bold leading-none whitespace-nowrap" falsy="-">
            {price}
          </Numeral>
        </div>
        {/* Background */}
        <div css={[tw`absolute top-0 left-0 flex flex-col w-full h-full z-[-1]`]}>
          <div tw="flex flex-col flex-1 rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.14)]">
            <div tw="relative text-nego flex">
              <div css={[tw`flex-1 bg-nego rounded-tl-lg h-[23px]`, count === 0 && tw`rounded-tr-lg`]} />
              <div tw="absolute left-0 bottom-[-1px] z-[-1] w-full h-[2px] bg-nego" />
              {/* Listing Count */}
              {count !== 0 && (
                <>
                  <div tw="absolute top-0 right-[23px] h-full w-[2px] bg-nego" />
                  <div tw="relative">
                    <MarkerRoundedCorner />
                    <div tw="absolute h-5 px-2 top-[-8px] left-[12px] rounded-[40px] bg-black text-white text-info font-bold whitespace-nowrap">
                      {count}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div tw="flex-1 bg-nego rounded-br-lg" />
          </div>
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
                boxShadow: '1px 3px 6px 1px rgba(0,0,0,0.4)',
              },
            ]}
          />
        </div>
      </button>
    </div>
  </div>
));

interface PopperProps {
  /** 단지명  */
  name: string;
  /** 세대수 */
  householdCount: number;
  /** 매매 매물수 */
  buyListingCount: number;
  /** 전월세 매물수 */
  rentListingCount: number;
}

function Popper({ name, householdCount, buyListingCount, rentListingCount }: PopperProps) {
  return (
    <div tw="p-3 whitespace-nowrap bg-white flex flex-col rounded-lg border border-gray-1000 z-[100]">
      <span tw="text-b2 font-bold leading-4 mb-1">{name}</span>
      <div tw="flex gap-2 items-center">
        <span tw="text-gray-700 text-info leading-none">{householdCount}세대</span>
        {Boolean(buyListingCount) && (
          <span tw="text-gray-700 text-info leading-none">
            매매 <span tw="text-gray-1000">{buyListingCount}</span>
          </span>
        )}
        {Boolean(rentListingCount) && (
          <span tw="text-gray-700 text-info leading-none">
            전월세 <span tw="text-gray-1000">{rentListingCount}</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Object.assign(ListingMarker, {
  Popper,
});
