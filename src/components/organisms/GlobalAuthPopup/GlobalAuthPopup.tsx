import { useEffect, useRef, useState } from 'react';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useOutsideClick from '@/hooks/useOutsideClick';

import Ctas from './Ctas';

export default function GlobalAuthPopup() {
  const { isOpenAuthPopup, closeAuthPopup, resetAuthPopup } = useAuthPopup();

  const [ipAddress, setIpAddress] = useState('');

  const popupContainerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: popupContainerRef,
    handler: () => {
      closeAuthPopup();
      resetAuthPopup();
    },
    enabled: isOpenAuthPopup,
  });

  useEffect(() => {
    if (!isOpenAuthPopup) return;

    async function fetchIpAddress() {
      const response = await fetch('/api/ip/getIpAddress');
      const data = await response.json();
      setIpAddress(data.ipAddress);
    }

    fetchIpAddress();

    return () => setIpAddress('');
  }, [isOpenAuthPopup]);

  useEffect(() => {
    const handleBack = () => {
      closeAuthPopup();
      resetAuthPopup();
    };

    window.addEventListener('popstate', handleBack);

    return () => window.removeEventListener('popstate', handleBack);
  }, [closeAuthPopup, resetAuthPopup]);

  if (!isOpenAuthPopup) return null;

  return (
    <OverlayPresenter>
      <div ref={popupContainerRef}>
        <Popup>
          <Popup.ContentGroup tw="py-6 rounded-lg">
            <Ctas ipAddress={ipAddress} />
          </Popup.ContentGroup>
        </Popup>
      </div>
    </OverlayPresenter>
  );
}
