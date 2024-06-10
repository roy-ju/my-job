import { useState, useMemo, useEffect } from 'react';

import { InternalFaqListResponse } from '@/services/internal/useFetchInternalFaqList';

export default function useFilterCategory({ data }: { data?: InternalFaqListResponse }) {
  const [filterCategory, setFilterCategory] = useState('');

  const categories = useMemo(() => {
    if (!data) return [];

    if (data) {
      return Object.keys(data);
    }
  }, [data]);

  const list = useMemo(() => data?.[filterCategory] ?? [], [filterCategory, data]);

  useEffect(() => {
    if (categories?.length) {
      setFilterCategory(categories[0]);
    }
  }, [categories]);

  return { categories, list, filterCategory, handleChangeFilterCategory: setFilterCategory };
}
