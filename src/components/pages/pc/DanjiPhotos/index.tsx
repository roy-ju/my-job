import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { Panel } from '@/components/atoms';
import { DanjiPhotos as DanjiPhotosTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import React from 'react';
import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiPhotos({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const { danji } = useDanjiDetail(depth);

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
