/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAPI_GetDanjiDetail } from '@/apis/danji/danjiDetail';
import React, { memo } from 'react';

import { DanjiDetailTemplate } from './components/template';

export default memo(
  ({ danjiID, prefetchedData }: { danjiID: number | null; prefetchedData?: { [key: string]: any } | null }) => {
    const { danji } = useAPI_GetDanjiDetail({ preFetchedData: prefetchedData, danjiId: danjiID });

    return (
      <div>
        <DanjiDetailTemplate />
      </div>
    );
  },
);
