import { memo } from 'react';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import ListItem from './ListItem';

import { MiddleCategory, SmallCategory, TermsListItem } from './types';

import { ListItemWrraper, ListTitle } from './widget/SpecialTermsWidget';

import { PrefixListElementItemId, SpecialTermsBottomElementId } from './constants/element_id';

type ListsProps = {
  categoryTablist: {
    title: MiddleCategory;
    subTitle: SmallCategory;
  }[];
  list: TermsListItem[];
};

function Lists({ categoryTablist, list }: ListsProps) {
  return (
    <>
      {categoryTablist.map((tabList, index) => (
        <ListItemWrraper key={tabList.title} id={`${PrefixListElementItemId}-${tabList.title}`}>
          <ListTitle>{tabList.subTitle}</ListTitle>
          {list
            .filter((listItem) => listItem.smallCategory === tabList.subTitle)
            .map((item) => (
              <ListItem key={item.title} item={item} />
            ))}
          {categoryTablist.length !== index + 1 && (
            <>
              <MarginTopTwenty />
              <SeperatorV2 tw="[min-height: 12px]" />
            </>
          )}
        </ListItemWrraper>
      ))}
      <div id={SpecialTermsBottomElementId} tw="[min-height: 10px] [min-width: 100%]" />
    </>
  );
}

export default memo(Lists);
