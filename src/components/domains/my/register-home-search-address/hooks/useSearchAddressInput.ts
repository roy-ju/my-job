import { ChangeEvent, useCallback, useState } from 'react';

export default function useSearchAddressInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  }, []);

  return { inputValue, handleChange };
}
