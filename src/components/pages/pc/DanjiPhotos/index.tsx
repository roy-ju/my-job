import React from 'react';

import { Panel } from '@/components/atoms';

import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';

import { DanjiPhotos as DanjiPhotosTemplate } from '@/components/templates';

import useDanjiDetailPc from '@/components/domains/danji/hooks/useDanjiDetailPc';

import { useRouter } from '@/hooks/utils';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiPhotos({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const { danji } = useDanjiDetailPc(depth);

  const onClickBack = () => {
    router.popLast();
  };

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : undefined,
    realestateType: danji?.type,
  });

  return (
    <Panel width={panelWidth}>
      <DanjiPhotosTemplate danjiName={danji?.name} danjiPhotos={danjiPhotos} onClickBack={onClickBack} />
    </Panel>
  );
}
