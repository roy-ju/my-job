import React, { ReactNode } from 'react';
import ActiveListingInfo from './ActiveListingInfo';
import BasicInfo from './BasicInfo';

interface DanjiDetailSectionProps {
  children: ReactNode;
}

function DanjiDetailSection({ children }: DanjiDetailSectionProps) {
  return <>{children}</>;
}

export default Object.assign(DanjiDetailSection, { Info: BasicInfo, ActiveInfo: ActiveListingInfo });
