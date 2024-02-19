import { ChangeEventHandler, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

export default function useFieldName() {
  const router = useRouter();

  const prefillName = `${router.query.name || ''}`;

  const [name, setName] = useState(prefillName);

  const handleChangeName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setName(e.target.value);
  }, []);

  const handleResetName = useCallback(() => {
    setName('');
  }, []);

  return { name, handleChangeName, handleResetName };
}
