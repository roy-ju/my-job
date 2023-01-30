import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function Panel({ children }: Props) {
  return (
    <div className="panel h-full w-[375px] bg-white p-2 shadow-md">
      {children}
    </div>
  );
}
