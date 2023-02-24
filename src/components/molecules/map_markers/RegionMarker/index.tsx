import { Children, ReactNode } from 'react';
import tw from 'twin.macro';

function DanjiCount({ count }: { count: number }) {
  return <p tw="text-info text-inherit">단지 {count}</p>;
}

function ListingCount({ count }: { count: number }) {
  return <p tw="text-info text-inherit">매물 {count}</p>;
}

function Divider() {
  return <div tw="w-px h-1.5 mx-1 bg-gray-300" />;
}

function Container({ name, children }: { name: string; children: ReactNode }) {
  const childrenCount = Children.count(children);
  const minWidth = childrenCount > 1 ? '5.5rem' : '3.75rem';

  return (
    <div
      css={[
        tw`flex flex-col relative w-fit rounded-lg min-w-[5.5rem] h-[3.75rem] shadow-[0_8px_16px_rgba(0,0,0,0.14)]`,
        { minWidth },
      ]}
    >
      <div tw="flex-1 flex items-center justify-center bg-blue rounded-t-lg px-2">
        <p tw="text-b2 font-bold text-white">{name}</p>
      </div>
      <div tw="flex-1 flex items-center justify-center bg-white rounded-b-lg text-blue-1000 px-2">
        {children}
      </div>
    </div>
  );
}

export default Object.assign(Container, {
  DanjiCount,
  ListingCount,
  Divider,
});
