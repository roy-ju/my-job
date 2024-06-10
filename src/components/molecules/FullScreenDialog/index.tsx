import { useCallback, useState } from 'react';

import useScrollLock from '@/hooks/useScrollLock';

import MobileGlobalStyles from '@/styles/MobileGlobalStyles';

import Container from './Container';

import Backdrop from './Backdrop';

import FullScreenDialogs from './FullScreenDialogs';

export default function OverlayContainer() {
  const [dialogsActive, setDialogsActive] = useState(false);

  const onDialogsChange = useCallback((active: boolean) => {
    setDialogsActive(active);
  }, []);

  useScrollLock(dialogsActive);

  return (
    <>
      <MobileGlobalStyles />
      <Container>
        <Backdrop />
        <FullScreenDialogs onChange={onDialogsChange} />
      </Container>
    </>
  );
}
