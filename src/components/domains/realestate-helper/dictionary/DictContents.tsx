import { Fragment, memo } from 'react';

import { GuideListItem } from '@/services/sub-home/types';

import ListItem from './ListItem';

import { CategoryName, Column } from './widget/DictContentsWidget';

import Seperator from './widget/Seperator';

import { PrefixListElementItemId } from './constants/element_id';

type DictContentsProps = {
  item: GuideListItem;
};

function DictContents({ item }: DictContentsProps) {
  return (
    <Column id={`${PrefixListElementItemId}-${item.name}`}>
      <CategoryName>{item.name}</CategoryName>
      <div>
        {item.children?.map((dict) => (
          <Fragment key={dict.id}>
            <Seperator />
            <ListItem id={dict.id} title={dict.name} thumbnail={dict.content} />
          </Fragment>
        ))}
      </div>
    </Column>
  );
}

export default memo(DictContents);
