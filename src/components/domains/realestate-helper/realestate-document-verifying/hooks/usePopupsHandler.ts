import { useState, useCallback } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

export default function usePopupsHandler() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const [popup, setPopup] = useState<'startCreateDocumentPopup' | 'verifyAddressExceedMaxCountPopup' | ''>('');

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
      if (depth1 === Routes.RealestateDocumentAddressVerifying) {
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
    toast.success('등기부 조회를 시작해요.');

    // api 호출을 해야합니다.

    if (platform === 'pc') {
      handleRedirectRealestateDocumentList();
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`);
    }
  }, [handleClosePopup, handleRedirectRealestateDocumentList, platform, router]);

  const handleConfirmVerifyAddressExceedMaxCountPopup = useCallback(() => {
    handleClosePopup();

    if (platform === 'pc') {
      handleRedirectRealestateDocumentList();
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`);
    }
  }, [handleClosePopup, handleRedirectRealestateDocumentList, platform, router]);

  return { popup, handleConfirmStartCreateDocumentPopup, handleConfirmVerifyAddressExceedMaxCountPopup };
}
