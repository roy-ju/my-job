import { ReactNode, useState } from 'react';
import Check from '@/assets/icons/check.svg';

type Props = {
  text?: ReactNode;
  onChange: (i: any, checked: boolean) => void;
};

export function Checkbox({ text, onChange }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <button
      type="button"
      tw="flex items-center gap-2"
      onClick={() => {
        setChecked(!checked);

        onChange(text, checked);
      }}
    >
      {checked ? (
        <Check />
      ) : (
        <div tw="w-[1.25rem] h-[1.25rem] rounded-[0.25rem]  bg-white border-gray-1000 cursor-pointer border-[1px]" />
      )}
      <span>{text}</span>
    </button>
  );
}
