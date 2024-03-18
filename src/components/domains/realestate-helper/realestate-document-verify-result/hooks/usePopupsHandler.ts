import { useState, useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export type PopupProps = 'startCreateDocumentPopup' | 'needConfirmAddressPopup' | 'remainingCountZeroPopup' | '';

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

  const handleRedirectRealestateDocumentList = useCallback(() => {
    const depth1 = router?.query?.depth1 ?? '';
    const depth2 = router?.query?.depth2 ?? '';

    const query = router.query;

    delete query.depth1;
    delete query.depth2;
    delete query.dong;
    delete query.ho;
    delete query.addressData;

    if (depth1 && depth2) {
      if (depth1 === Routes.RealestateDocumentAddressVerifyResult) {
        router.replace({
          pathname: `/${Routes.RealestateDocumentList}/${depth2}`,
          query: {
            ...query,
          },
        });
      } else {
        router.replace({
          pathname: `/${depth1}/${Routes.RealestateDocumentList}`,
          query: {
            ...query,
          },
        });
      }
    } else if (depth1 && !depth2) {
      router.replace({
        pathname: `/${Routes.RealestateDocumentList}`,
        query: {
          ...query,
        },
      });
    }
  }, [router]);

  const handleConfirmStartCreateDocumentPopup = useCallback(async () => {
    handleClosePopup();

    if (platform === 'pc') {
      handleRedirectRealestateDocumentList();
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`);
    }
  }, [handleClosePopup, handleRedirectRealestateDocumentList, platform, router]);

  return {
    popup,
    handleRedirectRealestateDocumentList,
    handleConfirmStartCreateDocumentPopup,
    handleOpenPopup,
    handleClosePopup,
  };
}
