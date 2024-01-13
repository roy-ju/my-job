import { useCallback } from 'react';

import useLocalStorage from '../useLocalStorage';

export interface RecentSearchType {
  id: string;
}

export default function useRecentSearches<T extends RecentSearchType>() {
  const [items, setItems] = useLocalStorage<T[]>('negocio_pc_recent_searches', []);

  const remove = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems],
  );

  const add = useCallback(
    (item: T) => {
      setItems((prev) => [item, ...prev]);
    },
    [setItems],
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return {
    items,
    remove,
    add,
    clear,
  };
}
