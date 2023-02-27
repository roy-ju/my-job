import { Children, ReactNode } from 'react';
import tw from 'twin.macro';
import variants, { VariantKey } from '../variants';

function DanjiCount({ count }: { count: number }) {
  return <p tw="text-info text-inherit">단지 {count}</p>;
}

function ListingCount({ count }: { count: number }) {
  return <p tw="text-info text-inherit">매물 {count}</p>;
}

function Divider() {
  return <div tw="w-px h-1.5 mx-1 bg-gray-300" />;
}

function Container({
  name,
  variant,
  children,
}: {
  name: string;
  variant: VariantKey;
  children: ReactNode;
}) {
  const childrenCount = Children.count(children);
  const minWidth = childrenCount > 1 ? '5.5rem' : '3.75rem';

  return (
    <div tw="w-fit">
      <div
        css={[
          tw`flex flex-col rounded-lg min-w-[5.5rem] h-[60px] shadow-[0_8px_16px_rgba(0,0,0,0.14)]`,
          { minWidth, overflowY: 'visible' },
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
            tw`flex items-center justify-center flex-1 px-2 bg-white rounded-b-lg`,
            { color: variants[variant].textColor },
          ]}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Object.assign(Container, {
  DanjiCount,
  ListingCount,
  Divider,
});
