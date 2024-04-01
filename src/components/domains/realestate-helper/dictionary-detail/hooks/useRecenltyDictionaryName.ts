import { useEffect } from 'react';

import useRecentlyClickedElementId from '@/states/hooks/useRecentlyClickedElementId';

export default function useRecenltyDictionaryName({ name }: { name?: string }) {
  const { handleUpdateRecentlyClickedElementId } = useRecentlyClickedElementId();

  useEffect(() => {
    if (name) {
      handleUpdateRecentlyClickedElementId(`negocio-dictionary-${name}`);
    }
  }, [name, handleUpdateRecentlyClickedElementId]);
}
