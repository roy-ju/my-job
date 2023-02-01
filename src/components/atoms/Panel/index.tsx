import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function Panel({ children }: Props) {
  return (
    <div className="h-full w-[375px] overflow-y-auto overflow-x-visible bg-white p-2 shadow-md">
      {children}
    </div>
  );
}
