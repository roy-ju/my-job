import tw from 'twin.macro';

import { Checkbox } from '@/components/atoms';

import { GuideListItem } from '@/services/sub-home/types';

import { RequiredListItem } from './widget/ListingCheckListWidget';

type ListItemProps = {
  item: GuideListItem;
  checkedItems: Record<number, boolean>;
  handleClick: (id: number) => void;
};

export default function ListItem({ item, checkedItems, handleClick }: ListItemProps) {
  return (
    <RequiredListItem
      layout
      css={[checkedItems[item.id] && tw`text-gray-600 bg-gray-200`]}
      onClick={() => handleClick(item.id)}
    >
      <Checkbox iconType="graySquare" checked={checkedItems[item.id] || false} />
      {item.content}
    </RequiredListItem>
  );
}
