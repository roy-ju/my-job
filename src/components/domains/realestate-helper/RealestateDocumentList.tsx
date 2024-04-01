import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import { MarginTopEight } from '@/components/atoms/Margin';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Loading from '@/components/atoms/Loading';

import { NavigationHeader } from '@/components/molecules';

import BottomFixedAnimationButton from '@/components/organisms/BottomFixedAnimationButton';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useFetchSubHomeRealestateDocumentList from '@/services/sub-home/useFetchSubHomeRealestateDocumentList';

import Routes from '@/router/routes';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

import useHandleClickBack from './realestate-document-list/hooks/useHandleClickBack';

import usePopupsHandler from './realestate-document-list/hooks/usePopupsHandler';

import { FlexContents } from './realestate-document-list/widget/RealestateDocumentListWidget';

import List from './realestate-document-list/List';

import Nodata from './realestate-document-list/Nodata';

const RealestateDocumentCreatingPopup = dynamic(
  () => import('./realestate-document-list/popups/RealestateDocumentCreatingPopup'),
  { ssr: false },
);

const RealestateDocumentRemainingCountPopup = dynamic(
  () => import('./realestate-document-list/popups/RealestateDocumentRemainingCountPopup'),
  { ssr: false },
);

export default function RealestateDocumentList() {
  const { list, remainingCount, isLoading } = useFetchSubHomeRealestateDocumentList();

  const { handleClickBack } = useHandleClickBack();

  const router = useRouter();

  const [render, setRender] = useState(false);

  const { platform } = useCheckPlatform();

  const { popup, handleClosePopup, handleOpenPopup } = usePopupsHandler();

  useIosWebkitNoneApplySafeArea();

  const handleRouteSearchAddress = useCallback(() => {
    if (platform === 'pc') {
      const depth1 = router?.query?.depth1 ?? '';
      const depth2 = router?.query?.depth2 ?? '';

      const query = router.query;

      delete query.depth1;
      delete query.depth2;
      delete query.addressData;
      delete query.dong;
      delete query.ho;

      if (depth1 && depth2) {
        if (depth1 === Routes.RealestateDocumentList) {
          router.push({
            pathname: `/${Routes.RealestateDocumentSearchAddress}/${depth2}`,
            query: {
              ...query,
            },
          });
        } else {
          router.push({
            pathname: `/${depth1}/${Routes.RealestateDocumentSearchAddress}`,
            query: {
              ...query,
            },
          });
        }
      } else if (depth1 && !depth2) {
        router.push({
          pathname: `/${Routes.RealestateDocumentSearchAddress}`,
          query: {
            ...query,
          },
        });
      }
    }

    if (platform === 'mobile') {
      router.push(`/${Routes.EntryMobile}/${Routes.RealestateDocumentSearchAddress}`);
    }
  }, [platform, router]);

  const handleConfirmRemainingCountPopup = useCallback(() => {
    if (remainingCount > 0) {
      handleRouteSearchAddress();
    }

    handleClosePopup();
  }, [remainingCount, handleClosePopup, handleRouteSearchAddress]);

  const handleClickRealestateDocumentCreate = useCallback(async () => {
    handleOpenPopup('remaining');
  }, [handleOpenPopup]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Container id="negocio-realestate-document-list">
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleClickBack} />
          <NavigationHeader.Title>조회한 등기부 목록</NavigationHeader.Title>
        </NavigationHeader>
        <MarginTopEight />
        <FlexContents>
          {list.length === 0 ? <Nodata /> : <List list={list} handleOpenPopup={() => handleOpenPopup('creating')} />}
          {render && (
            <BottomFixedAnimationButton
              width={115}
              containerId="negocio-realestate-document-list"
              buttonId={GOOGLE_TAG_BUTTON_ID.REALESTATE_DOCUMENT_NEW_SEARCH}
              ctaTitle="신규조회"
              platform={platform}
              handleClick={handleClickRealestateDocumentCreate}
            />
          )}
        </FlexContents>
      </Container>
      {popup === 'creating' && <RealestateDocumentCreatingPopup handleConfirm={handleClosePopup} />}
      {popup === 'remaining' && (
        <RealestateDocumentRemainingCountPopup
          remainingCount={remainingCount}
          handleConfirm={handleConfirmRemainingCountPopup}
        />
      )}
    </>
  );
}
