import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import Loading from '@/components/atoms/Loading';

import { MarginTopEighty, MarginTopSixty } from '@/components/atoms/Margin';

import usePopupsHandler from './realestate-document-verifying/hooks/usePopupsHandler';

const VerifyAddressExceedMaxCountPopup = dynamic(
  () => import('./realestate-document-verifying/popups/VerifyAddressExceedMaxCountPopup'),
  { ssr: false },
);

const StartCreateDocumentPopup = dynamic(
  () => import('./realestate-document-verifying/popups/StartCreateDocumentPopup'),
  { ssr: false },
);

const Contents = styled.div`
  ${tw`flex flex-col gap-2 px-5 py-3`}

  span:nth-of-type(1) {
    ${tw`text-heading_04`}
  }

  span:nth-of-type(2) {
    ${tw`text-gray-700 text-body_03`}
  }
`;

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 w-full min-h-0`}
`;

export default function RealestateDocumentVerifying() {
  const { popup, handleConfirmStartCreateDocumentPopup, handleConfirmVerifyAddressExceedMaxCountPopup } =
    usePopupsHandler();

  return (
    <Container>
      <MarginTopSixty />
      <Contents>
        <span>주소를 확인하고 있어요.</span>
        <span>평균 30초 정도 걸려요. 조금만 기다려주세요!</span>
      </Contents>
      <MarginTopSixty />
      <FlexContents>
        <MarginTopEighty />
        <Loading />
        <MarginTopEighty />
      </FlexContents>
      <MarginTopSixty />

      {popup === 'startCreateDocumentPopup' && (
        <StartCreateDocumentPopup handleConfirm={handleConfirmStartCreateDocumentPopup} />
      )}
      {popup === 'verifyAddressExceedMaxCountPopup' && (
        <VerifyAddressExceedMaxCountPopup handleConfirm={handleConfirmVerifyAddressExceedMaxCountPopup} />
      )}
    </Container>
  );
}
