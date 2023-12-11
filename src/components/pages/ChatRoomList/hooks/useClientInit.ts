import { useMemo } from 'react';

import useChatRoomListStore from './useChatRoomListStore';

export default function useClientInit() {
  const store = useChatRoomListStore();

  const renderCondition = useMemo(() => {
    if (!store) return '';

    if (store.isLoading) return 'loading';

    if (!store.data.list) return 'nodata';

    if (store.data.list.length > 0) return 'list';

    return '';
  }, [store]);

  return { renderCondition };
}
