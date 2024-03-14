import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import SeperatorV2 from '@/components/atoms/SeperatorV2';
import tw, { styled } from 'twin.macro';
import useHandleClickBack from './realestate-document-detail/hooks/useHandleClickBack';

import usePopupHandler from './realestate-document-detail/hooks/usePopupHandler';

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

const FlexContents = styled.div`
  ${tw`flex-1 min-h-0 pb-5 overflow-y-auto`}
`;

export default function RealestateDocumentDetail() {
  const { handleClickBack } = useHandleClickBack();

  const { popup, handleClosePopup, handleOpenPopup } = usePopupHandler();

  return (
    <>
      <Container>
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleClickBack} />
          <NavigationHeader.Title onClick={handleClickBack}>등기부 조회 결과</NavigationHeader.Title>
          <DeleteButton onClick={() => handleOpenPopup('delete')}>삭제</DeleteButton>
        </NavigationHeader>

        <FlexContents>
          <Address />
          <SeperatorV2 />
          <Summary />
        </FlexContents>
      </Container>

      {popup === 'delete' && <DeleteRealestateDocumentPopup handleCancel={handleClosePopup} />}
      {popup === 'update' && <UpdateRealestateDocumentPopup handleCancel={handleClosePopup} />}
      {popup === 'previous' && <PreviouslyHistoriesPopup handleConfirm={handleClosePopup} />}
      {popup === 'impossible' && <ImpossibeUpdateRealestateDocumentPopup handleConfirm={handleClosePopup} />}
    </>
  );
}
