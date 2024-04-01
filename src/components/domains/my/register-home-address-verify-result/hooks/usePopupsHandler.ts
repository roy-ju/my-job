import { useState, useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export type PopupProps = 'alreadyExistAddress' | 'invalidAccess' | '';

export default function usePopupsHandler() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [popup, setPopup] = useState<PopupProps>('');

  const handleOpenPopup = useCallback((v: PopupProps) => {
    setPopup(v);
  }, []);

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, []);

  const handleRedirectRegisteredMyHome = useCallback(() => {
    handleClosePopup();

    const depth1 = router?.query?.depth1 ?? '';
    const depth2 = router?.query?.depth2 ?? '';

    const query = router.query;

    delete query.depth1;
    delete query.depth2;
    delete query.addressData;
    delete query.addressList;
    delete query.dong;
    delete query.ho;
    delete query.errorCode;
    delete query.resultType;

    if (depth1 && depth2) {
      if (depth1 === Routes.MyAddressVerifyResult) {
        router.replace({
          pathname: `/${Routes.MyRegisteredHomes}/${depth2}`,
          query: {
            ...query,
          },
        });
      } else {
        router.replace({
          pathname: `/${depth1}/${Routes.MyRegisteredHomes}`,
          query: {
            ...query,
          },
        });
      }
    } else if (depth1 && !depth2) {
      router.replace({
        pathname: `/${Routes.MyRegisteredHomes}`,
        query: {
          ...query,
        },
      });
    }
  }, [handleClosePopup, router]);

  const handleRedirectHome = useCallback(async () => {
    handleClosePopup();

    if (platform === 'pc') {
      router.replace(`/`);
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
    }
  }, [handleClosePopup, platform, router]);

  return {
    popup,
    handleRedirectRegisteredMyHome,
    handleRedirectHome,
    handleOpenPopup,
  };
}
