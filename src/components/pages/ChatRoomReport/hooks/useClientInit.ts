import { useMemo } from 'react';

import useChatRoomReportStore from './useChatRoomReportStore';

export default function useClientInit() {
  const store = useChatRoomReportStore();

  const renderCondition = useMemo(() => {
    if (!store) return '';

    if (store.isLoading || !store.data) return 'loading';

    if (store.data) return 'render';

    return '';
  }, [store]);

  return { renderCondition };
}
