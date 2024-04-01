import React from 'react';

import tw from 'twin.macro';

import InfiniteScroll from '@/components/atoms/InfiniteScroll';

import MyListItem from '@/components/organisms/my/my-list-item';

import { MyFavoriteDanjiListUiItem } from './types';

const DanjiDivider = tw.div`border-b border-gray-300  my-5`;

type DanjisListProps = {
  danjiList: MyFavoriteDanjiListUiItem[];
  onNextDanji: () => void;
  handleToggleDanjiItem: (danjiID: number, realestateType: number, isDanjiFavorite: boolean) => Promise<void>;
  handleClickDanjiItem: (danjiID: number) => () => void;
};

export default function DanjisList({
  danjiList,
  onNextDanji,
  handleToggleDanjiItem,
  handleClickDanjiItem,
}: DanjisListProps) {
  return (
    <InfiniteScroll tw="flex-1 min-h-0 overflow-auto " onNext={onNextDanji}>
      <div tw="mx-5 my-7">
        {danjiList?.map((item, i) => (
          <React.Fragment key={item.danjiId}>
            {i > 0 && <DanjiDivider />}

            <MyListItem.Danji
              onClickDanjiItem={handleClickDanjiItem}
              onToggleDanjiLike={handleToggleDanjiItem}
              {...item}
            />
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
}
