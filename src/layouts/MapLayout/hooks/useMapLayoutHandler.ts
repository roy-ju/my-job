import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import useMap from '@/states/hooks/useMap';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import Routes from '@/router/routes';

import usePanelVisible from './usePanelVisible';

import useTab from './useTab';

export default function useMapLayoutHandler() {
  const router = useRouter();

  const map = useMap();

  const { panelsVisible, handlePanelsVisible, togglePanelsVisibility } = usePanelVisible();

  const { tabIndex, handleChangeTabIndex } = useTab();

  const { unreadChatCount } = useSyncronizer();

  const handleClickLogo = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleChangeRoutes = useCallback(
    (index: number) => {
      switch (index) {
        case 0: // 홈
          router.push('/');
          break;
        case 1: // 거래도우미
          router.push(`/${Routes.SubHome}`);
          break;
        case 2: // 지도
          map.naverMap?.setZoom(16, true);
          router.push(`/${Routes.Map}`);
          break;
        case 3: // 문의목록
          router.push(`/${Routes.ChatRoomList}`);
          break;
        case 4: // 마이페이지
          router.push(`/${Routes.My}`);
          break;
        case 5: // 개발자설정
          router.replace(`/${Routes.Developer}`);
          break;
        default:
          break;
      }
      handleChangeTabIndex(index);
      handlePanelsVisible(true);
    },
    [handleChangeTabIndex, handlePanelsVisible, map?.naverMap, router],
  );

  useEffect(() => {
    handlePanelsVisible(true);

    if (router.pathname === '/') {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestForm) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestDetail) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestGuide) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.SuggestFormUpdate) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQna) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaSearch) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaDetail) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaCreate) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.LawQnaUpdate) {
      handleChangeTabIndex(0);
    } else if (router.query.depth1 === Routes.Map || router.pathname === `/${Routes.Map}`) {
      handleChangeTabIndex(2);
    } else if (router.query.depth1 === Routes.SubHome) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.TradeProcess) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.SpecialTerms) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.CommonSense) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.Dictionary) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.DictionaryDetail) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.ListingCheckList) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentSearchAddress) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentAddressDetail) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentAddressVerifying) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentAddressVerifyResult) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentList) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.RealestateDocumentDetail) {
      handleChangeTabIndex(1);
    } else if (router.query.depth1 === Routes.ChatRoomList) {
      handleChangeTabIndex(3);
    } else if (router.query.depth1 === Routes.My) {
      handleChangeTabIndex(4);
    } else if (router.query.depth1 === Routes.Developer) {
      handleChangeTabIndex(5);
    } else {
      handleChangeTabIndex(0);
    }
  }, [handleChangeTabIndex, handlePanelsVisible, router]);

  return {
    unreadChatCount,
    tabIndex,
    panelsVisible,
    togglePanelsVisibility,
    handleClickLogo,
    handleChangeRoutes,
  };
}
