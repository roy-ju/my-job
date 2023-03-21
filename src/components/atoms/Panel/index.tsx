import type { ReactNode } from 'react';
import tw from 'twin.macro';

interface Props {
  width?: string;
  zIndex?: number;
  children?: ReactNode;
}

export default function Panel({ width = '380px', zIndex = 1, children }: Props) {
  return (
    <div tw="h-full bg-white shadow" style={{ width, zIndex }}>
      <div css={[tw`w-full h-full overflow-x-hidden overflow-y-auto`, { width }]}>{children}</div>
    </div>
  );
}
