import { MarginTopEight, MarginTopFourty, MarginTopTwenty } from '@/components/atoms/Margin';

import CurrentEtcs from './CurrentEtcs';

import CurrentOwners from './CurrentOwners';

import Loans from './Loans';

import { AddressContainer } from './widget/RealestateDocumentDetailWidget';

import Caution from './Caution';

// import { SummaryContainer, SummaryWrraper } from './widget/RealestateDocumentDetailWidget';

export default function Summary() {
  return (
    <>
      <MarginTopTwenty />
      <AddressContainer>
        <Caution message="담보 제공이 있으니 주의 하세요!" />
        <CurrentOwners />
        <CurrentEtcs />
        <Loans />
      </AddressContainer>
    </>
  );
}
