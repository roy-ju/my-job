import { Children, MouseEventHandler, ReactNode } from 'react';

import tw from 'twin.macro';

import { Numeral } from '@/components/atoms';

import variants, { VariantKey } from '../variants';

function DanjiCount({ count }: { count: number }) {
  return (
    <p tw="text-info text-inherit">
      단지 <Numeral>{count}</Numeral>
    </p>
  );
}

function ListingCount({ count }: { count: number }) {
  return (
    <p tw="text-info text-inherit">
      매물 <Numeral>{count}</Numeral>
    </p>
  );
}

function Divider() {
  return <div tw="w-px h-1.5 mx-1 bg-gray-300" />;
}

interface Props {
  /** 지역명 e.g. 역삼동 */
  name: string;
  /** 마커 색상 */
  variant: VariantKey;
  /** 매물수, 단지수 */
  children: ReactNode;
  /** 마커 클릭이벤트 핸들러 */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Wrraper({ name, variant, children, onClick }: Props) {
  const childrenCount = Children.count(children);
  const minWidth = childrenCount > 1 ? '5.5rem' : '3.75rem';

  return (
    <button
      type="button"
      tw="w-fit animate-scale will-change-transform [text-rendering: optimizeSpeed]"
      onClick={onClick}
    >
      <div
        css={[
          tw`relative flex flex-col rounded-lg min-w-[5.5rem] h-[60px]`,
          { minWidth, overflowY: 'visible' },
          {
            boxShadow: '7px 7px 5px rgba(0, 0, 0, 0.16)',
          },
        ]}
      >
        <div
          css={[
            tw`flex items-center justify-center flex-1 px-2 rounded-t-lg`,
            { backgroundColor: variants[variant].bgColor },
          ]}
        >
          <p tw="text-b2 font-bold text-white">{name}</p>
        </div>
        <div
          css={[
            tw`flex items-center justify-center flex-1 px-2 bg-white rounded-b-lg whitespace-nowrap`,
            { color: variants[variant].textColor },
          ]}
        >
          {children}
        </div>
      </div>
    </button>
  );
}

export default Object.assign(Wrraper, {
  DanjiCount,
  ListingCount,
  Divider,
});
