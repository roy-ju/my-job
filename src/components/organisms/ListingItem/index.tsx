import React, { ReactNode } from 'react';
import TypeOne from './TypeOne';

interface ListingItemProps {
  children: ReactNode;
}

function ListingItem({ children }: ListingItemProps) {
  return <>{children}</>;
}

export default Object.assign(ListingItem, { TypeOne });
