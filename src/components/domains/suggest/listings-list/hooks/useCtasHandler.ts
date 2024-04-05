import { useCallback, useState } from 'react';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import router from 'next/router';

import getPath from '@/utils/getPath';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

export default function useCtasHandler({ isRecommendable, danjiID }: { isRecommendable: boolean; danjiID: number }) {
  const { platform } = useCheckPlatform();

  const [impossibleSuggestAreaPopup, setImpossibleSuggestAreaPopup] = useState(false);

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const handleCloseImpossibleSuggestAreaPopup = useCallback(() => {
    setImpossibleSuggestAreaPopup(false);
  }, []);

  const handleCreateSuggestPc = useCallback(() => {
    const path = getPath({
      depth1: router?.query?.depth1 as NegocioPath,
      depth2: router?.query?.depth2 as NegocioPath,
      targetPath: Routes.SuggestForm as NegocioPath,
    });

    router.push({ pathname: path, query: { entry: Routes.SuggestListings, danjiID: `${danjiID}` } });
  }, [danjiID]);

  const handleCreateSuggestMobile = useCallback(() => {
    router.push({
      pathname: `/${Routes.EntryMobile}/${Routes.SuggestForm}`,
      query: {
        danjiID: `${danjiID}`,
        entry: Routes.SuggestListings,
      },
    });
  }, [danjiID]);

  const handleClickCreateSuggestButton = useCallback(() => {
    if (inAppInfo.isInAppBrowser) {
      handleOpenAppInstallPopup();
      return;
    }

    if (!isRecommendable) {
      setImpossibleSuggestAreaPopup(true);
      return;
    }

    if (platform === 'pc') {
      handleCreateSuggestPc();
    }

    if (platform === 'mobile') {
      handleCreateSuggestMobile();
    }
  }, [
    handleCreateSuggestMobile,
    handleCreateSuggestPc,
    handleOpenAppInstallPopup,
    inAppInfo.isInAppBrowser,
    isRecommendable,
    platform,
  ]);

  const handleClickDanjiDetailButton = useCallback(() => {
    if (platform === 'pc') {
      router.push(`/${Routes.DanjiDetail}/${danjiID}`);
      // router.push({
      //   pathname: `/${Routes.DanjiDetail}`,
      //   query: {
      //     danjiID: `${danjiID}`,
      //   },
      // });
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}/${danjiID}`);
      // router.push({
      //   pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}`,
      //   query: {
      //     danjiID: `${danjiID}`,
      //   },
      // });
    }
  }, [danjiID, platform]);

  return {
    impossibleSuggestAreaPopup,
    handleClickDanjiDetailButton,
    handleClickCreateSuggestButton,
    handleCloseImpossibleSuggestAreaPopup,
  };
}
