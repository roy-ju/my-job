import { GuideListItem } from '@/services/sub-home/types';

import { RequiredListWrraper } from './widget/ListingCheckListWidget';

import ListItem from './ListItem';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

type RequiredListProps = {
  list: GuideListItem[];
  checkedItems: Record<number, boolean>;
  handleClick: (id: number) => void;
};

export default function RequiredList({ list, checkedItems, handleClick }: RequiredListProps) {
  return (
    <RequiredListWrraper initial="hidden" animate="visible" variants={listVariants}>
      {list.map((item) => (
        <ListItem item={item} key={item.id} checkedItems={checkedItems} handleClick={handleClick} />
      ))}
    </RequiredListWrraper>
  );
}
