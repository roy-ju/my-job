import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { PopupProps } from './usePopupsHandler';

export default function useResultType({ handleOpenPopup }: { handleOpenPopup: (v: PopupProps) => void }) {
  const { query } = useRouter();

  const [type, setType] = useState<'findAddressOverTen' | 'notFoundAddress' | 'serviceError' | ''>('');

  useEffect(() => {
    if (query?.resultType === 'serviceError') {
      setType('serviceError');
    }

    if (query?.resultType === 'findAddressOverTen') {
      setType('findAddressOverTen');
    }

    if (query?.resultType === 'notFoundAddress') {
      setType('notFoundAddress');
      handleOpenPopup('needConfirmAddressPopup');
    }
  }, [handleOpenPopup, query]);

  return { type };
}
