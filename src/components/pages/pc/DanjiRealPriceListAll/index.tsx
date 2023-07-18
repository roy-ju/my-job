import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import { Panel } from '@/components/atoms';
import { DanjiRealPriceListAll as DanjiRealPriceListAllTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import React from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiRealPriceList({ panelWidth, depth }: Props) {
  const router = useRouter(depth);

  const { danji } = useAPI_GetDanjiDetail({
    danjiId: Number(router?.query?.danjiID),
  });

  const onClickBackButton = () => {
    router.popLast();
  };

  return (
    <Panel width={panelWidth}>
      <DanjiRealPriceListAllTemplate depth={depth} danji={danji} onClickBackButton={onClickBackButton} />
    </Panel>
  );
}
