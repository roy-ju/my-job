import { useCallback, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { toast } from 'react-toastify';

import Container from '@/components/atoms/Container';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Loading from '@/components/atoms/Loading';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeRealestateDocumentDetail from '@/services/sub-home/useFetchSubHomeRealestateDocumentDetail';

import { apiService } from '@/services';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import useHandleClickBack from './realestate-document-detail/hooks/useHandleClickBack';

import usePopupsHandler from './realestate-document-detail/hooks/usePopupsHandler';

import { DeleteButton } from './realestate-document-detail/widget/RealestateDocumentDetailWidget';

import Summary from './realestate-document-detail/Summary';

import Address from './realestate-document-detail/Address';

const DeleteRealestateDocumentPopup = dynamic(
  () => import('./realestate-document-detail/popups/DeleteRealestateDocumentPopup'),
  { ssr: false },
);

const ImpossibeUpdateRealestateDocumentPopup = dynamic(
  () => import('./realestate-document-detail/popups/ImpossibeUpdateRealestateDocumentPopup'),
  { ssr: false },
);

const PreviouslyHistoriesPopup = dynamic(() => import('./realestate-document-detail/popups/PreviouslyHistoriesPopup'), {
  ssr: false,
});

const UpdateRealestateDocumentPopup = dynamic(
  () => import('./realestate-document-detail/popups/UpdateRealestateDocumentPopup'),
  { ssr: false },
);

const NotUseFunctionInIosPopup = dynamic(() => import('./realestate-document-detail/popups/NotUseFunctionInIosPopup'), {
  ssr: false,
});

const FlexContents = styled.div`
  ${tw`flex-1 min-h-0 pb-5 overflow-y-auto`}
`;

export default function RealestateDocumentDetail() {
  const { handleClickBack } = useHandleClickBack();

  const { popup, handleClosePopup, handleOpenPopup } = usePopupsHandler();

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const id = router?.query?.realestatedDocumentID ? Number(router.query.realestatedDocumentID) : 0;

  const { data, mutate, isLoading } = useFetchSubHomeRealestateDocumentDetail({ id });

  const [loadingRenew, setLoadingRenew] = useState(false);

  const handleViewPreviousHistories = useCallback(() => {
    if (data?.previous_history_list && data.previous_history_list.length > 0) {
      handleOpenPopup('previous');
      return;
    }

    toast.error('이전 조회 이력이 없습니다.', { toastId: 'notFoundPrevious' });
  }, [data?.previous_history_list, handleOpenPopup]);

  const handleCheckUpdateRealestateDocument = useCallback(async () => {
    const response = await apiService.subHomeRealestateDocumentList();

    if (response?.remaining_count && response.remaining_count > 0) {
      handleOpenPopup('update');
    } else if (response?.remaining_count === 0) {
      handleOpenPopup('impossible');
    }
  }, [handleOpenPopup]);

  const handleRedirectRealestateDocumentList = useCallback(() => {
    if (platform === 'pc') {
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
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}/${Routes.RealestateDocumentList}`);
    }
  }, [platform, router]);

  const handleDeleteRealestateDocument = useCallback(async () => {
    await apiService.deleteSubhomeRealestatedocument({ id });
    handleClosePopup();
    handleRedirectRealestateDocumentList();
  }, [handleClosePopup, handleRedirectRealestateDocumentList, id]);

  const handleRenewRealestateDocument = useCallback(async () => {
    setLoadingRenew(true);
    await apiService.renewSubhomeRealestatedocument({ id });
    setLoadingRenew(false);
    await mutate();
    handleClosePopup();
  }, [handleClosePopup, id, mutate]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Container>
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleClickBack} />
          <NavigationHeader.Title onClick={handleClickBack}>등기부 조회 결과</NavigationHeader.Title>
          <DeleteButton onClick={() => handleOpenPopup('delete')}>삭제</DeleteButton>
        </NavigationHeader>

        <FlexContents>
          <Address
            info={data?.realestate_document_info}
            pdfInfo={data?.realestate_document_pdf}
            handleViewPreviousHistories={handleViewPreviousHistories}
            handleCheckUpdateRealestateDocument={handleCheckUpdateRealestateDocument}
            handleOpenPopup={handleOpenPopup}
          />
          <SeperatorV2 />
          <Summary summary={data?.realestate_document_summary} />
        </FlexContents>
      </Container>

      {popup === 'delete' && (
        <DeleteRealestateDocumentPopup handleCancel={handleClosePopup} handleConfirm={handleDeleteRealestateDocument} />
      )}
      {popup === 'update' && (
        <UpdateRealestateDocumentPopup
          loading={loadingRenew}
          handleCancel={handleClosePopup}
          handleConfirm={handleRenewRealestateDocument}
        />
      )}
      {popup === 'previous' && (
        <PreviouslyHistoriesPopup handleConfirm={handleClosePopup} list={data?.previous_history_list ?? []} />
      )}
      {popup === 'impossible' && <ImpossibeUpdateRealestateDocumentPopup handleConfirm={handleClosePopup} />}
      {popup === 'notUserFunctionInIos' && <NotUseFunctionInIosPopup handleConfirm={handleClosePopup} />}
    </>
  );
}
