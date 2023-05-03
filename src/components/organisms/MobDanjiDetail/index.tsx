import React, { ReactNode } from 'react';
import ActiveListingInfo from './ActiveListingInfo';
import BasicInfo from './BasicInfo';
import { DanjiHeader } from './DanjiHeader';
import DetailInfo from './DetailInfo';
import RealPriceInfo from './RealPriceInfo';
import RealPricesList from './RealPricesList';
import RealPricesPyoungList from './RealPricesPyoungList';
import SchoolInfo from './SchoolInfo';
import AroundInfo from './AroundInfo';

interface MobDanjiDetailSectionProps {
  children: ReactNode;
}

function MobDanjiDetailSection({ children }: MobDanjiDetailSectionProps) {
  return <>{children}</>;
}

export default Object.assign(MobDanjiDetailSection, {
  Header: DanjiHeader,
  Info: BasicInfo,
  DetailInfo,
  ActiveInfo: ActiveListingInfo,
  RealPriceInfo,
  RealPricesPyoungList,
  RealPricesList,
  SchoolInfo,
  AroundInfo,
});
