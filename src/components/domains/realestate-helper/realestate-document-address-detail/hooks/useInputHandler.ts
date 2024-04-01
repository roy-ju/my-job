import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function useInputHandler() {
  const router = useRouter();

  const [dong, setDong] = useState('');

  const [ho, setHo] = useState('');

  const handleChangeDong = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setDong(e.target.value);
  }, []);

  const handleChangeHo = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setHo(e.target.value);
  }, []);

  useEffect(() => {
    if (router?.query?.dong) {
      setDong(router.query.dong as string);
    }

    if (router?.query?.ho) {
      setHo(router.query.ho as string);
    }
  }, [router]);

  return { dong, ho, handleChangeDong, handleChangeHo };
}
