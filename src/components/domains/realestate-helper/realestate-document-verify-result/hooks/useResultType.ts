import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function useResultType() {
  const { query } = useRouter();

  const [type, setType] = useState<'findAddressOverTen' | 'notFoundAddress' | 'serviceError' | ''>('');

  const [openPopup, setOpenPopup] = useState(false);

  const handleClosePopup = useCallback(() => {
    setOpenPopup(false);
  }, []);

  useEffect(() => {
    if (query?.resultType === 'serviceError') {
      setType('serviceError');
    }

    if (query?.resultType === 'findAddressOverTen') {
      setType('findAddressOverTen');
    }

    if (query?.resultType === 'notFoundAddress') {
      setType('notFoundAddress');
      setOpenPopup(true);
    }
  }, [query]);

  return { type, openPopup, handleClosePopup };
}
