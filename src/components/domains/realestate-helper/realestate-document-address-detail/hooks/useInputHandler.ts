import { ChangeEventHandler, useCallback, useState } from 'react';

export default function useInputHandler() {
  const [dong, setDong] = useState('');

  const [ho, setHo] = useState('');

  const handleChangeDong = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setDong(e.target.value);
  }, []);

  const handleChangeHo = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setHo(e.target.value);
  }, []);

  return { dong, ho, handleChangeDong, handleChangeHo };
}
