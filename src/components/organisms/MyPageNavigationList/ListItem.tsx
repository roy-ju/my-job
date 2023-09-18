import { Button } from '@/components/atoms';
import ChevronIcon from '@/assets/icons/my_chevron_16.svg';

interface ListItemProps {
  title: string;
  onClick?: () => void;
}

export default function ListItem({ title, onClick }: ListItemProps) {
  return (
    <Button
      variant="ghost"
      size="big"
      onClick={onClick}
      tw="w-full text-b1 justify-start px-5 rounded-none hover:bg-gray-50 h-14"
    >
      <div tw="flex flex-1 items-center justify-between h-full">
        <span>{title}</span>
        <ChevronIcon tw="mb-[2px]" />
      </div>
    </Button>
  );
}
