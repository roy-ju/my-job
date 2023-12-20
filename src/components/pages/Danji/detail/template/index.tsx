import React, { useCallback, useState } from 'react';

import Header from '../components/header';

import Popups from '../components/popups';

import Contents from '../components';

export default function DanjiDetail() {
  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const handleHeaderActive = useCallback((value: boolean) => {
    setIsHeaderActive(value);
  }, []);

  return (
    <div tw="relative w-full flex flex-col h-full overflow-x-hidden">
      <Header isHeaderActive={isHeaderActive} />
      <Contents handleHeaderActive={handleHeaderActive} />
      <Popups />
    </div>
  );
}
