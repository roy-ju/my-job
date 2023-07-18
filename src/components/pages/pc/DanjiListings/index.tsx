import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { Panel } from '@/components/atoms';
import { DanjiListings as DanjiListingsTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import React, { useState } from 'react';
import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiListings({ panelWidth, depth }: Props) {
  const router = useRouter(depth);

  const [dropDownValue, setDropDownValue] = useState('최신순');

  const handleChangeDropDown = (value: string) => {
    setDropDownValue(value);
  };

  const { danji } = useDanjiDetail(depth);

  const { data, increamentPageNumber, totalCount } = useAPI_GetDanjiListingsList({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
    orderBy: dropDownValue === '최신순' ? 1 : 2,
    pageSize: 10,
  });

  return (
    <Panel width={panelWidth}>
      <DanjiListingsTemplate
        depth={depth}
        danji={danji}
        data={data}
        totalCount={totalCount}
        dropDownValue={dropDownValue}
        onNext={increamentPageNumber}
        handleChangeDropDown={handleChangeDropDown}
      />
    </Panel>
  );
}
