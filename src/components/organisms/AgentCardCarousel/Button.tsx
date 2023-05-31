import ChevronLeft from '@/assets/icons/chevron_left_24.svg';
import tw from 'twin.macro';
import { HTMLProps } from 'react';

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'onClick'> {
  direction: 'left' | 'right';
  onClick: () => void;
}

export default function Button({ direction, onClick: handleClick, ...others }: ButtonProps) {
  return (
    <button type="button" onClick={handleClick} tw="bg-black rounded-full" {...others}>
      <ChevronLeft tw="text-white" css={[direction === 'right' && tw`rotate-180`]} />
    </button>
  );
}
