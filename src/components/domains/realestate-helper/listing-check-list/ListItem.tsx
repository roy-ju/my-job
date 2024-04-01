import tw from 'twin.macro';

import { Checkbox } from '@/components/atoms';

import { GuideListItem } from '@/services/sub-home/types';

import { RequiredListItem } from './widget/ListingCheckListWidget';

type ListItemProps = {
  item: GuideListItem;
  checkedItems: Record<number, boolean>;
  handleClick: (id: number) => void;
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export default function ListItem({ item, checkedItems, handleClick }: ListItemProps) {
  return (
    <RequiredListItem
      layout
      css={[checkedItems[item.id] && tw`text-gray-600 bg-gray-200`]}
      onClick={() => handleClick(item.id)}
      variants={itemVariants}
    >
      <Checkbox iconType="graySquare" checked={checkedItems[item.id] || false} />
      {item.content}
    </RequiredListItem>
  );
}
