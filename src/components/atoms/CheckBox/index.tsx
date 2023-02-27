import { ReactNode, useEffect, useState } from 'react';
import Check from '@/assets/icons/check.svg';

type Props = {
  children?: ReactNode;
  onChange?: () => void;
};

export function Checkbox({ children, onChange }: Props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!onChange) return;
    onChange();
  }, [checked, onChange]);

  return (
    <button
      type="button"
      tw="flex items-center gap-2"
      onClick={() => setChecked(!checked)}
    >
      {checked ? (
        <Check />
      ) : (
        <div tw="w-[1.25rem] h-[1.25rem] rounded-[0.25rem]  bg-white border-gray-1000 cursor-pointer border-[1px]" />
      )}
      {children}
    </button>
  );
}
