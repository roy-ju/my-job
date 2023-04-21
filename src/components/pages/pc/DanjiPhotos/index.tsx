import { useAPI_GetDanjiPhotos } from '@/apis/danji/danjiPhotos';
import { Panel } from '@/components/atoms';
import { DanjiPhotos as DanjiPhotosTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import React from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiPhotos({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const onClickBack = () => {
    router.popLast();
  };

  const { danjiPhotos } = useAPI_GetDanjiPhotos({
    pnu: router?.query?.p ? (router.query.p as string) : undefined,
    realestateType: router?.query?.rt ? Number(router.query.rt) : undefined,
  });

  return (
    <Panel width={panelWidth}>
      <DanjiPhotosTemplate danjiPhotos={danjiPhotos} onClickBack={onClickBack} />
    </Panel>
  );
}
