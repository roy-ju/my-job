import openPopupWindow from '@/utils/openPopupWindow';
import { useCallback, useEffect, useMemo } from 'react';

export default function useNiceId() {
  const init = useCallback(() => {}, []);
  const deInit = useCallback(() => {}, []);

  const request = useCallback(async () => {
    openPopupWindow({
      url: '/nice/id?type=1',
      title: '본인인증',
      width: 490,
      height: 812,
    });
  }, []);

  useEffect(
    () => () => {
      deInit();
    },
    [deInit],
  );

  return useMemo(() => ({ request, init, deInit }), [request, init, deInit]);
}
