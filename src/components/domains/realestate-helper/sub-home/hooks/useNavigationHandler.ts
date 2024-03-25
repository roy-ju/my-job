import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useAuth from '@/hooks/services/useAuth';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import Routes from '@/router/routes';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import useWindowOpen from '@/hooks/useWindowOpen';
import { SubHomUrlType } from '../types';

export default function useNavigtaionHandler() {
  const router = useRouter();

  const { user } = useAuth();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const { platform } = useCheckPlatform();

  const { openWindowWithLink } = useWindowOpen();

  const makeUrl = useCallback(
    (type: SubHomUrlType) => {
      if (type === 'tradeProcess') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.TradeProcess}`
          : `/${Routes.EntryMobile}/${Routes.TradeProcess}`;
      }

      if (type === 'dict') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.Dictionary}`
          : `/${Routes.EntryMobile}/${Routes.Dictionary}`;
      }

      if (type === 'commonSense') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.CommonSense}`
          : `/${Routes.EntryMobile}/${Routes.CommonSense}`;
      }

      if (type === 'specialTerms') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.SpecialTerms}`
          : `/${Routes.EntryMobile}/${Routes.SpecialTerms}`;
      }

      if (type === 'listingCheckList') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.ListingCheckList}`
          : `/${Routes.EntryMobile}/${Routes.ListingCheckList}`;
      }

      if (type === 'documentList') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.RealestateDocumentList}`
          : `/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`;
      }

      if (type === 'documentSearch') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.RealestateDocumentSearchAddress}`
          : `/${Routes.EntryMobile}/${Routes.RealestateDocumentSearchAddress}`;
      }

      return '';
    },
    [platform],
  );

  const handleNavigateSubPage = useCallback(
    (link: string) => {
      if (!user && inAppInfo.isInAppBrowser) {
        handleOpenAppInstallPopup();
        return;
      }

      if (!user) {
        openAuthPopup('onlyLogin');
        handleUpdateReturnUrl(link);
        return;
      }

      router.push(link);
    },
    [handleOpenAppInstallPopup, handleUpdateReturnUrl, inAppInfo.isInAppBrowser, openAuthPopup, router, user],
  );

  const handleNavigateDictDetail = useCallback(
    (id: number) => {
      if (!user && inAppInfo.isInAppBrowser) {
        handleOpenAppInstallPopup();
        return;
      }

      const url =
        platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.DictionaryDetail}?dictID=${id}`
          : `/${Routes.EntryMobile}/${Routes.DictionaryDetail}?dictID=${id}`;

      if (!user) {
        openAuthPopup('onlyLogin');
        handleUpdateReturnUrl(url);
        return;
      }

      router.push(url);
    },
    [handleOpenAppInstallPopup, handleUpdateReturnUrl, inAppInfo.isInAppBrowser, openAuthPopup, platform, router, user],
  );

  const handleNavigateCommonSenseDetail = useCallback(
    (link: string) => {
      if (inAppInfo.isInAppBrowser) {
        handleOpenAppInstallPopup();
      }

      if (!user) {
        const url =
          platform === 'pc'
            ? `/${Routes.SubHome}/${Routes.CommonSense}`
            : `/${Routes.EntryMobile}/${Routes.CommonSense}`;

        openAuthPopup('onlyLogin');
        handleUpdateReturnUrl(url);
        return;
      }

      openWindowWithLink(link);
    },
    [
      handleOpenAppInstallPopup,
      handleUpdateReturnUrl,
      inAppInfo.isInAppBrowser,
      openAuthPopup,
      openWindowWithLink,
      platform,
      user,
    ],
  );

  return {
    handleNavigateSubPage,
    handleNavigateDictDetail,
    handleNavigateCommonSenseDetail,
    makeUrl,
  };
}
