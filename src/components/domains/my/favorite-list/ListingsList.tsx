import React from 'react';

import tw from 'twin.macro';

import InfiniteScroll from '@/components/atoms/InfiniteScroll';

import MyListItem from '@/components/organisms/my/my-list-item';

import FavoriteListDropdown from './FavoriteListDropdown';

import { MyFavoriteListingListUiItem } from './types';

const ListingDivider = tw.div`border-b border-gray-300 mx-5`;

type ListingsListProps = {
  dropdownValue: string;
  dropdownHandler: (newValue: string) => void;

  listingsList: MyFavoriteListingListUiItem[];
  onNextListing: () => void;
  handleToggleListingItem: (id: number, isListingFavorite: boolean) => Promise<void>;
  handleClickListingItem: (listingId: number) => () => void;
};

export default function ListingsList({
  dropdownValue,
  dropdownHandler,

  listingsList,
  onNextListing,
  handleToggleListingItem,
  handleClickListingItem,
}: ListingsListProps) {
  return (
    <InfiniteScroll tw="flex-1 min-h-0 overflow-auto" onNext={onNextListing}>
      <FavoriteListDropdown value={dropdownValue} handleChange={dropdownHandler} />

      <div>
        {listingsList?.map((item, i) => (
          <React.Fragment key={item.listingId}>
            {i > 0 && <ListingDivider />}

            <MyListItem.Listing
              onClickListingItem={handleClickListingItem}
              onToggleListingLike={handleToggleListingItem}
              {...item}
            />
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
}
