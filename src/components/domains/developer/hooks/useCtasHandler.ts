import { useCallback } from 'react';

import getCurrentPosition from '@/utils/getCurrentPosition';

import { toast } from 'react-toastify';

export default function useCtasHandler() {
  const handleUpdateCurrentPosition = useCallback(() => {
    getCurrentPosition(
      ({ lat, lng }) => {
        toast.success(`lat: ${lat} lng: ${lng}`);
      },
      () => {
        toast.error(`failed`);
      },
    );
  }, []);

  const handleCopyToken = useCallback(async (text: string) => {
    await window?.navigator?.clipboard?.writeText(text);

    toast.success('클립보드에 복사되었습니다.');
  }, []);

  return { handleUpdateCurrentPosition, handleCopyToken };
}
