import { memo } from 'react';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import ListItem from './ListItem';

import { MiddleCategory, SmallCategory, TermsListItem } from './types';

import { ListItemWrraper, ListTitle } from './widget/SpecialTermsWidget';

import { PrefixListElementItemId } from './constants/element_id';

type ListsProps = {
  categoryTablist: {
    title: MiddleCategory;
    subTitle: SmallCategory;
  }[];
  list: TermsListItem[];
  openTitle: string | null;
  handleChangeOpenTitle: (v: string | null) => void;
};

function Lists({ categoryTablist, list, openTitle, handleChangeOpenTitle }: ListsProps) {
  console.log('render list component');
  return (
    <>
      {categoryTablist.map((tabList, index) => (
        <ListItemWrraper key={tabList.title} id={`${PrefixListElementItemId}-${tabList.title}`}>
          <ListTitle>{tabList.subTitle}</ListTitle>
          {list
            .filter((listItem) => listItem.smallCategory === tabList.subTitle)
            .map((item) => (
              <ListItem
                key={item.title}
                item={item}
                openTitle={openTitle}
                handleChagneOpenTitle={handleChangeOpenTitle}
              />
            ))}
          {categoryTablist.length !== index + 1 && (
            <>
              <MarginTopTwenty />
              <SeperatorV2 tw="[min-height: 12px]" />
            </>
          )}
        </ListItemWrraper>
      ))}
    </>
  );
}

export default memo(Lists);
