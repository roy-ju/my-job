import { useAPI_GetDanjiListingsList } from '@/apis/danji/danjiListingsList';
import { Panel } from '@/components/atoms';
import { DanjiListings as DanjiListingsTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import React from 'react';
import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiListings({ panelWidth, depth }: Props) {
  const router = useRouter(depth);

  const handleBackButton = () => {
    router.popLast();
  };

  const { danji } = useDanjiDetail(depth);

  const { data, increamentPageNumber } = useAPI_GetDanjiListingsList({
    pnu: router?.query?.p ? (router.query.p as string) : undefined,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
    pageSize: 10,
  });

  return (
    <Panel width={panelWidth}>
      <DanjiListingsTemplate
        depth={depth}
        danji={danji}
        data={data}
        onNext={increamentPageNumber}
        handleBackButton={handleBackButton}
      />
    </Panel>
  );
}
