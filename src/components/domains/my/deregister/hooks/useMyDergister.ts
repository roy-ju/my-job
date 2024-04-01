import { useState, useCallback, ChangeEvent } from 'react';

import { toast } from 'react-toastify';

export default function useMyDergister() {
  const [deregisterReasons, setDeregisterReasons] = useState<string[]>([]);

  const [extraReasons, setExtraReasons] = useState('');

  const handleChangeDeregisterReasons = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      if (deregisterReasons.includes(name)) {
        setDeregisterReasons(deregisterReasons.filter((reason) => reason !== name));
      } else {
        setDeregisterReasons([...deregisterReasons, name]);
      }
    },
    [deregisterReasons],
  );

  const handleChangeExtraReasons = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 200) {
      setExtraReasons(e.target.value.slice(0, 200));
      toast.error('최대 200자까지 입력이 가능합니다.', { toastId: 'maxLength' });
      return;
    }
    setExtraReasons(e.target.value);
  }, []);

  return {
    deregisterReasons,
    extraReasons,
    handleChangeDeregisterReasons,
    handleChangeExtraReasons,
  };
}
