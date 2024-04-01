import { theme } from 'twin.macro';

import { Button } from '@/components/atoms';

import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';

interface ListItemProps {
  title?: string;
  onClick?: () => void;
}

export default function ListItem({ title, onClick }: ListItemProps) {
  return (
    <Button
      variant="ghost"
      size="big"
      onClick={onClick}
      tw="w-full text-b1 justify-start px-5 rounded-none hover:bg-gray-50"
    >
      <div tw="flex flex-1 items-center justify-between h-full">
        <span>{title}</span>
        <ChevronLeftIcon
          width={16}
          height={16}
          color={theme`colors.gray.700`}
          style={{ transform: 'rotate(180deg)' }}
        />
      </div>
    </Button>
  );
}
