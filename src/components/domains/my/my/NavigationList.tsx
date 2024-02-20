import tw, { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import ChevronIcon from '@/assets/icons/my_chevron_16.svg';

interface ListItemProps {
  title: string;
  onClick?: () => void;
}

function ListItem({ title, onClick }: ListItemProps) {
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

const List = styled.div`
  ${tw`bg-white`}
  & > button:not(:first-of-type) {
    ${tw`border-t border-t-gray-300`}
  }
`;

export default Object.assign(List, { Item: ListItem });
