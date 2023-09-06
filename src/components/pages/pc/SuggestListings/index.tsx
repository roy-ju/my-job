import { useAPI_GetDanjiSuggestList } from '@/apis/danji/danjiSuggestList';
import { Panel } from '@/components/atoms';
import { SuggestListings } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import { memo } from 'react';
import useDanjiDetail from '../DanjiDetail/useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const router = useRouter(depth);

  const { danji } = useDanjiDetail(depth);

  const { data, increamentPageNumber, totalCount } = useAPI_GetDanjiSuggestList({
    danjiId: router?.query?.danjiID ? Number(router.query.danjiID) : danji?.danji_id,
    pageSize: 10,
  });

  return (
    <>
      <Panel width={panelWidth}>
        <SuggestListings
          depth={depth}
          danji={danji}
          data={data}
          totalCount={totalCount}
          onNext={increamentPageNumber}
        />
      </Panel>
    </>
  );
});
