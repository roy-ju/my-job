import { useCallback, useEffect, useState } from 'react';

import ListItem from './ListItem';

import { ProcessLists } from './types';

import { listVariants } from './constants/animations';

import { Ul, Li } from './widget/ListsWidget';

type ListsProps = {
  tab: number;
  list: ProcessLists;
};

export default function Lists({ tab, list }: ListsProps) {
  const [openListItemIdx, setOpenListItemIdx] = useState<number>();

  const handleOpenListItem = useCallback((v: number) => {
    setOpenListItemIdx(v);
  }, []);

  useEffect(() => {
    if (tab) {
      setOpenListItemIdx(0);
    }
  }, [tab]);

  return (
    <Ul initial="hidden" animate="visible" variants={listVariants} key={tab}>
      {list.map((item, index) => (
        <Li key={item.order} hiddenVerticalLine={openListItemIdx !== index + 1} isLast={openListItemIdx === index + 1}>
          <ListItem
            key={item.order}
            item={item}
            openListItemIdx={openListItemIdx}
            handleClickListItem={handleOpenListItem}
          />
        </Li>
      ))}
    </Ul>
  );
}
