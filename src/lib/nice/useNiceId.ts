import { useCallback, useMemo } from 'react';

import useUnmount from '@/hooks/useUnmount';

import openPopupWindow from '@/utils/openPopupWindow';

import { NiceVerificationType } from '@/constants/enums';

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
    let typeInteger = NiceVerificationType.Phone;
    if (type === 'ipin') {
      typeInteger = NiceVerificationType.IPin;
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
