import React, { ReactNode } from 'react';
import UserInfo from './UserInfo';
import ListingInfo from './ListingInfo';
import SuggestedListings from './SuggestedListings';

interface Props {
  children: ReactNode;
}

function SuggestDetailListItem({ children }: Props) {
  return <>{children}</>;
}

export default Object.assign(SuggestDetailListItem, {
  UserInfo,
  ListingInfo,
  SuggestedListings,
});
