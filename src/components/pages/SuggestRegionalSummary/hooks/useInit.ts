import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { State } from '../types';

export default function useInit() {
  const router = useRouter();

  const params = useMemo(() => {
    if (typeof router.query.params === 'string') {
      return JSON.parse(router.query.params) as State['formData'];
    }

    return null;
  }, [router.query.params]);

  return params;
}
