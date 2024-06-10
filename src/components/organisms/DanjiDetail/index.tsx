import React, { ReactNode } from 'react';

import RealPriceInfo from './RealPriceInfo';

import RealPricesList from './RealPricesList';

import RealPricesPyoungList from './RealPricesPyoungList';

import SchoolInfo from './SchoolInfo';

interface DanjiDetailSectionProps {
  children: ReactNode;
}

function DanjiDetailSection({ children }: DanjiDetailSectionProps) {
  return <>{children}</>;
}

export default Object.assign(DanjiDetailSection, {
  RealPriceInfo,
  RealPricesList,
  RealPricesPyoungList,
  SchoolInfo,
});
