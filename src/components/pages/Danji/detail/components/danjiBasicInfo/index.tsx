import { Separator } from '@/components/atoms';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import Info from './Info';

export default function DanjiBasicInfo() {
  const store = useDanjiDetailStore();

  if (!store?.danji) return null;

  return (
    <div id="infoSection">
      <Separator tw="w-full [min-height: 8px]" />
      <Info danji={store.danji} />
    </div>
  );
}
