import type { ReactNode } from 'react';

type Props = {
  width: string;
  children?: ReactNode;
};

export default function Panel({ width, children }: Props) {
  return (
    <div className={`h-full w-[${width}] overflow-y-auto bg-white`}>
      {children}
    </div>
  );
}
