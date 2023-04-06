import useUnmount from '@/hooks/utils/useUnmount';
import openPopupWindow from '@/utils/openPopupWindow';
import { useCallback, useMemo } from 'react';

export interface NiceResponse {
  kie: string;
  encData: string;
  integrityValue: string;
  tokenVersionId: string;
  type: string;
}

type VerificationType = 'phone' | 'ipin';

export default function useNiceId() {
  const request = useCallback((type: VerificationType, callback?: (res: NiceResponse) => void) => {
    let typeInteger = 1;
    if (type === 'ipin') {
      typeInteger = 2;
    }

    window.Negocio.callbacks.niceResponse = (arg: NiceResponse) => {
      callback?.(arg);
    };
    openPopupWindow({
      url: `/nice/id?type=${typeInteger}`,
      title: '본인인증',
      width: 490,
      height: 812,
    });
  }, []);

  useUnmount(() => delete window.Negocio.callbacks.niceResponse);

  return useMemo(() => ({ request }), [request]);
}
