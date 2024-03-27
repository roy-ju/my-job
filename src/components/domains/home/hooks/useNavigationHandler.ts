import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useInAppBroswerHandler from '@/hooks/useInAppBroswerHandler';

import useAuth from '@/hooks/services/useAuth';

import Routes from '@/router/routes';

import useAuthPopup from '@/states/hooks/useAuhPopup';

import useReturnUrl from '@/states/hooks/useReturnUrl';

import { SubHomUrlType } from '../../realestate-helper/sub-home/types';

export default function useNavigationHandler() {
  const router = useRouter();

  const { user } = useAuth();

  const { platform } = useCheckPlatform();

  const { openAuthPopup } = useAuthPopup();

  const { handleUpdateReturnUrl } = useReturnUrl();

  const { inAppInfo, handleOpenAppInstallPopup } = useInAppBroswerHandler();

  const makeUrl = useCallback(
    (type: SubHomUrlType) => {
      if (type === 'tradeProcess') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.TradeProcess}`
          : `/${Routes.EntryMobile}/${Routes.TradeProcess}`;
      }

      if (type === 'dict') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.Dictionary}?entry=home`
          : `/${Routes.EntryMobile}/${Routes.Dictionary}?entry=home`;
      }

      if (type === 'commonSense') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.CommonSense}?entry=home`
          : `/${Routes.EntryMobile}/${Routes.CommonSense}?entry=home`;
      }

      if (type === 'specialTerms') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.SpecialTerms}?entry=home`
          : `/${Routes.EntryMobile}/${Routes.SpecialTerms}?entry=home`;
      }

      if (type === 'listingCheckList') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.ListingCheckList}?entry=home`
          : `/${Routes.EntryMobile}/${Routes.ListingCheckList}?entry=home`;
      }

      if (type === 'documentList') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.RealestateDocumentList}?entry=home`
          : `/${Routes.EntryMobile}/${Routes.RealestateDocumentList}?entry=home`;
      }

      if (type === 'documentSearch') {
        return platform === 'pc'
          ? `/${Routes.SubHome}/${Routes.RealestateDocumentSearchAddress}?entry=home`
          : `/${Routes.EntryMobile}/${Routes.RealestateDocumentSearchAddress}?entry=home`;
      }

      return '';
    },
    [platform],
  );

  const handleNavigateSubHomeAll = useCallback(() => {
    if (platform === 'pc') {
      router.push(`/${Routes.SubHome}`);
    } else if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.SubHome}`);
    }
  }, [platform, router]);

  const handleNavigateSubPage = useCallback(
    (link: string) => {
      if (inAppInfo.isInAppBrowser) {
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

  const handleNavigateLawQna = () => {
    if (platform === 'pc') {
      router.push(`/${Routes.LawQna}`);
    } else {
      router.push(`/${Routes.EntryMobile}/${Routes.LawQna}`);
    }
  };

  return { makeUrl, handleNavigateSubPage, handleNavigateSubHomeAll, handleNavigateLawQna };
}
