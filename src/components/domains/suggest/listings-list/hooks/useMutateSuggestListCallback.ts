import { useEffect } from 'react';

import { KeyedMutator } from 'swr';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import { DanjiSuggestListResponse } from '@/services/danji/types';

export default function useMutateSuggestListCallback({
  mutateCallback,
}: {
  mutateCallback: KeyedMutator<DanjiSuggestListResponse[]>;
}) {
  const { platform } = useCheckPlatform();

  useEffect(() => {
    if (platform === 'pc') {
      window.Negocio.callbacks.mutateSuggestList = () => {
        mutateCallback();
      };

      return () => {
        delete window.Negocio.callbacks.mutateSuggestList;
      };
    }
  }, [mutateCallback, platform]);
}
