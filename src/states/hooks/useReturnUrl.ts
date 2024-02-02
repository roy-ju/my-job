import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import returnUrlAtom from '../atom/returnUrl';

export default function useReturnUrl() {
  const [state, setState] = useRecoilState(returnUrlAtom);

  const router = useRouter();

  const handleUpdateReturnUrl = useCallback(
    (value?: string) => {
      setState(() => ({
        returnUrl: typeof value === 'string' ? value : router.asPath,
      }));
    },
    [setState, router],
  );

  return {
    returnUrl: state.returnUrl,
    handleUpdateReturnUrl,
  };
}
