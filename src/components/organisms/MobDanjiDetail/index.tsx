import { ReactNode } from 'react';

import RealPriceInfo from './RealPriceInfo';

import RealPricesList from './RealPricesList';

import RealPricesPyoungList from './RealPricesPyoungList';

import SchoolInfo from './SchoolInfo';

interface MobDanjiDetailSectionProps {
  children: ReactNode;
}

function MobDanjiDetailSection({ children }: MobDanjiDetailSectionProps) {
  return <>{children}</>;
}

export default Object.assign(MobDanjiDetailSection, {
  RealPriceInfo,

  RealPricesList,

  RealPricesPyoungList,

  SchoolInfo,
});
