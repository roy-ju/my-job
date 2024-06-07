import React, { MouseEventHandler, ReactNode } from 'react';

import { Numeral } from '@/components/atoms';

import tw from 'twin.macro';

import { BuyOrRent } from '@/constants/enums';

import MarkerTail from '../assets/marker_tail.svg';

import MarkerRoundedCorner from '../assets/marker_rounded_corner.svg';

import variants, { VariantKey } from '../variants';

interface Props {
  /** 마커 색상 */
  variant: VariantKey;
  /** 평 */
  area: number;
  /** 금액 */
  price: number;
  /** 매물수 */
  count: number;
  /** 마커 클릭 이벤트 핸들러 */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;

  /** 선택여부 */
  selected?: boolean;

  children?: ReactNode;
}

const DanjiMarker = React.memo(
  ({ selected = false, variant, area, price, count = 0, onClick, onMouseLeave, onMouseOver, children }: Props) => (
    <div tw="relative animate-scale will-change-transform [text-rendering: optimizeSpeed] inline-block w-fit">
      <div css={selected && tw`animate-bounce`}>
        {children && <div tw="absolute left-1/2 top-[-8px] translate-y-[-100%] translate-x-[-50%]">{children}</div>}
        <button
          type="button"
          tw="relative w-fit"
          onClick={(e) => {
            e.preventDefault();
            onClick?.(e);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            onMouseLeave?.(e);
          }}
          onMouseOver={(e) => {
            e.preventDefault();
            onMouseOver?.(e);
          }}
          onFocus={() => {}}
        >
          {/* Content */}
          <div tw="min-w-[3rem] h-[62px] pb-2 flex flex-col">
            <div css={[tw`h-[23px] flex items-center justify-start pl-2`, count !== 0 && tw`pr-6`]}>
              <Numeral
                css={[tw`text-[10px] leading-[10px] whitespace-nowrap`, { color: variants[variant].textColor }]}
                suffix="평"
                falsy="-평"
              >
                {area}
              </Numeral>
            </div>
            <div tw="flex flex-1 items-center justify-start pl-2 pr-3">
              <Numeral tw="text-b2 text-white font-bold whitespace-nowrap" koreanNumberShort falsy="-">
                {price}
              </Numeral>
            </div>
          </div>
          {/* Background */}
          <div tw="absolute top-0 left-0 flex flex-col w-full h-full z-[-1]">
            <div tw="flex flex-col flex-1 rounded-lg shadow-[7px_7px_5px_rgba(0,0,0,0.16)]">
              <div tw="relative flex">
                <div css={[tw`flex-1 h-[23px] bg-white rounded-tl-lg`, count === 0 && tw`rounded-tr-lg`]} />
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
              <div css={[tw`flex-1 rounded-br-lg`, { backgroundColor: variants[variant].bgColor }]} />
            </div>
            <div css={{ color: variants[variant].bgColor }} style={{ transform: 'translateY(-1px)' }}>
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
                  boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.16)',
                },
              ]}
            />
          </div>
        </button>
      </div>
    </div>
  ),
);

interface PopperProps {
  /** 단지명  */
  name: string;
  /** 세대수 */
  householdCount: number;
  /** 매매 매물수 */
  buyListingCount: number;
  /** 전월세 매물수 */
  rentListingCount: number;
  /** 전월세 매물수 */
  suggestCount: number;
  /** 마커 클릭 이벤트 핸들러 */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  mapBuyOrRent?: string;
}

function Popper({
  name,
  householdCount,
  buyListingCount,
  rentListingCount,
  suggestCount,
  mapBuyOrRent,
  onClick,
}: PopperProps) {
  return (
    <button
      type="button"
      tw="p-3 whitespace-nowrap bg-white flex flex-col rounded-lg border border-gray-1000 z-[100] cursor-default animate-scale will-change-transform [text-rendering: optimizeSpeed]"
      onClick={onClick}
    >
      <span tw="text-b2 font-bold leading-4 mb-1">{name}</span>
      <div tw="flex gap-1 items-center">
        {!!householdCount && (
          <span tw="text-gray-700 text-info leading-none">{householdCount.toLocaleString()}세대</span>
        )}
        {Boolean(suggestCount) && (
          <>
            <div tw="[min-height: 8px] [min-width: 1px] [background: #E9ECEF]" />
            <span tw="text-gray-700 text-info leading-none">
              구해요 <span tw="text-gray-1000">{suggestCount}</span>
            </span>
          </>
        )}

        {Boolean(buyListingCount) && mapBuyOrRent === BuyOrRent.Buy.toString() && (
          <>
            <div tw="[min-height: 8px] [min-width: 1px] [background: #E9ECEF]" />
            <span tw="text-gray-700 text-info leading-none">
              매물 <span tw="text-gray-1000">{buyListingCount}</span>
            </span>
          </>
        )}

        {Boolean(rentListingCount) && mapBuyOrRent !== BuyOrRent.Buy.toString() && (
          <>
            <div tw="[min-height: 8px] [min-width: 1px] [background: #E9ECEF]" />
            <span tw="text-gray-700 text-info leading-none">
              매물 <span tw="text-gray-1000">{rentListingCount}</span>
            </span>
          </>
        )}
      </div>
    </button>
  );
}

export default Object.assign(DanjiMarker, {
  Popper,
});
