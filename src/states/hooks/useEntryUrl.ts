import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import entryUrlAtom from '../atom/entryUrl';

export default function useEntryUrl() {
  const [state, setState] = useRecoilState(entryUrlAtom);

  const router = useRouter();

  const handleUpdateEntryUrl = useCallback(() => {
    setState({ entryUrl: router.asPath });
  }, [router.asPath, setState]);

  return { entryUrl: state.entryUrl, handleUpdateEntryUrl };
}
