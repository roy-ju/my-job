import { useMemo } from 'react';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import { SubHomeRealestatedocumentDetailResponse } from '@/services/sub-home/types';

import CurrentEtcs from './CurrentEtcs';

import CurrentOwners from './CurrentOwners';

import Loans from './Loans';

import { AddressContainer, InfoTitle } from './widget/RealestateDocumentDetailWidget';

import Caution from './Caution';

type SummaryProps = {
  summary?: SubHomeRealestatedocumentDetailResponse['realestate_document_summary'];
};

export default function Summary({ summary }: SummaryProps) {
  const cautionMessage = useMemo(() => {
    if (summary?.debt_list1 && summary.debt_list1.length > 0 && summary?.debt_list2 && summary.debt_list2.length > 0) {
      return '담보 제공 및 소유권 외의 기재사항이 있으니 주의하세요!';
    }

    if (summary?.debt_list1 && summary.debt_list1.length > 0) {
      return '소유권 외의 기재사항이 있으니 주의하세요!';
    }

    if (summary?.debt_list2 && summary.debt_list2.length > 0) {
      return '담보 제공이 있으니 주의하세요!';
    }

    return '';
  }, [summary]);

  return (
    <>
      <MarginTopTwenty />
      <AddressContainer>
        {!cautionMessage && <InfoTitle tw="px-5 pt-5">요약 정보</InfoTitle>}
        {cautionMessage && <Caution message={cautionMessage} />}
        {summary?.owner_list && summary.owner_list.length > 0 && <CurrentOwners list={summary.owner_list} />}

        {summary?.debt_list1 && summary.debt_list1.length > 0 && <CurrentEtcs list={summary.debt_list1} />}

        {summary?.debt_list2 && summary.debt_list2.length > 0 && <Loans list={summary.debt_list2} />}
      </AddressContainer>
    </>
  );
}
