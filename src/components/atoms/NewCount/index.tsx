import { HTMLProps } from 'react';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'size' | 'as' | 'value'> {
  value?: number | string | null | boolean;
}

export default function NewCount({ value, ...others }: Props) {
  return (
    <div tw="flex gap-4">
      {value && (
        <div
          tw="flex items-center justify-center rounded-full bg-red-800 w-4 h-4 text-count font-medium text-white text-center"
          {...others}
        >
          <span tw="mx-auto">{value}</span>
        </div>
      )}
    </div>
  );
}
