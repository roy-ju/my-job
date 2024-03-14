import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import { MarginTopEight } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import BottomFixedAnimationButton from '@/components/organisms/BottomFixedAnimationButton';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import List from './realestate-document-list/List';

import { FlexContents } from './realestate-document-list/widget/RealestateDocumentListWidget';

import useHandleClickBack from './realestate-document-list/hooks/useHandleClickBack';

// import Nodata from './realestate-document-list/Nodata';

const RealestateDocumentCreatingPopup = dynamic(
  () => import('./realestate-document-list/popups/RealestateDocumentCreatingPopup'),
  { ssr: false },
);

const RealestateDocumentRemainingCountPopup = dynamic(
  () => import('./realestate-document-list/popups/RealestateDocumentRemainingCountPopup'),
  { ssr: false },
);

export default function RealestateDocumentList() {
  const { handleClickBack } = useHandleClickBack();

  const router = useRouter();

  const [render, setRender] = useState(false);

  const { platform } = useCheckPlatform();

  const [popup, setPopup] = useState<'creating' | 'remaining' | ''>('');

  const [remainingCount, setRemainingCount] = useState(0);

  const handleClosePopup = useCallback(() => {
    setPopup('');
  }, []);

  const handleConfirmRemainingCountPopup = useCallback(() => {
    if (remainingCount > 0) {
      // 주소 검색 페이지로 보낸다.
      console.log(router);
    }

    handleClosePopup();
  }, [remainingCount, router, handleClosePopup]);

  const handleClickRealestateDocumentCreate = useCallback(async () => {
    // 주소 가능횟수 검토 api 호출하고
    // 해당 응답값에 따라 setCount 및 팝업 타입 정하기
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRender(true);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Container id="negocio-realestate-document-list">
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleClickBack} />
          <NavigationHeader.Title>조회한 등기부 목록</NavigationHeader.Title>
        </NavigationHeader>
        <MarginTopEight />
        <FlexContents>
          {/* <Nodata /> */}
          <List />
          {render && (
            <BottomFixedAnimationButton
              width={115}
              containerId="negocio-realestate-document-list"
              ctaTitle="신규조회"
              platform={platform}
              handleClick={handleClickRealestateDocumentCreate}
            />
          )}
        </FlexContents>
      </Container>
      {popup === 'creating' && <RealestateDocumentCreatingPopup handleConfirm={handleConfirmRemainingCountPopup} />}
      {popup === 'remaining' && (
        <RealestateDocumentRemainingCountPopup remainingCount={remainingCount} handleConfirm={() => {}} />
      )}
    </>
  );
}
