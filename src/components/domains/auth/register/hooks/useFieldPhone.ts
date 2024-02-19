import { ChangeEventHandler, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

export default function useFieldPhone() {
  const router = useRouter();

  const prefillPhone = `${router.query.phone || ''}`;

  const [phone, setPhone] = useState(prefillPhone);

  const handleChangePhone = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    const phoneInput = e.target.value;

    if (phoneInput.length <= 13) {
      setPhone(
        phoneInput
          .replace(/[^0-9]/g, '')
          .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
          .replace(/(-{1,2})$/g, ''),
      );
    }
  }, []);

  const handleResetPhone = useCallback(() => {
    setPhone('');
  }, []);

  return { phone, handleChangePhone, handleResetPhone };
}
