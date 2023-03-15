import type { ReactNode } from 'react';
import tw from 'twin.macro';

interface Props {
  width?: string;
  children?: ReactNode;
}

export default function Panel({ width = '380px', children }: Props) {
  return (
    <div tw="h-full bg-white shadow" style={{ width }}>
      <div css={[tw`w-full h-full p-2 overflow-x-hidden overflow-y-auto`, { width }]}>{children}</div>
    </div>
  );
}
