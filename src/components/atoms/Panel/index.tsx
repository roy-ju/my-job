import type { ReactNode } from 'react';
import tw from 'twin.macro';

type Props = {
  width: string;
  children?: ReactNode;
};

export default function Panel({ width, children }: Props) {
  return (
    <div
      css={[
        tw`h-full overflow-y-auto bg-white`,
        {
          width,
        },
      ]}
    >
      {children}
    </div>
  );
}
