import React, { ReactNode } from 'react';

import TypeOne from './TypeOne';

import TypeTwo from './TypeTwo';

interface ListingItemProps {
  children: ReactNode;
}

function ListingItem({ children }: ListingItemProps) {
  return <>{children}</>;
}

export default Object.assign(ListingItem, { TypeOne, TypeTwo });
