import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import dynamic from 'next/dynamic';

import { MarginTopFourty, MarginTopThirtyTwo } from '@/components/atoms/Margin';
import useHandleClickBack from './realestate-document-verify-result/hooks/useHandleClickBack';

import useResultType from './realestate-document-verify-result/hooks/useResultType';

import ResultMessage from './realestate-document-verify-result/ResultMessage';

import ServiceError from './realestate-document-verify-result/ServiceError';

import Ctas from './realestate-document-verify-result/Ctas';

import PreviouslyEnteredAddress from './realestate-document-verify-result/PreviouslyEnteredAddress';

import { Line, LineWrraper } from './realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';
import Notice from './realestate-document-address-detail/Notice';

const NeedConfirmAddressPopup = dynamic(
  () => import('./realestate-document-verify-result/popups/NeedConfirmAddressPopup'),
  { ssr: false },
);

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 h-full overflow-x-hidden overflow-y-auto`}
`;

export default function RealestateDocumentVerifyResult() {
  const { type, openPopup, handleClosePopup } = useResultType();

  const { handleClickBack } = useHandleClickBack();

  return (
    <>
      <Container>
        {(type === 'findAddressOverTen' || type === 'notFoundAddress') && (
          <NavigationHeader>
            <NavigationHeader.BackButton onClick={handleClickBack} />
            <NavigationHeader.Title>등기부 신규 조회</NavigationHeader.Title>
          </NavigationHeader>
        )}

        <ResultMessage type={type} />

        {(type === 'findAddressOverTen' || type === 'notFoundAddress') && <MarginTopFourty />}

        <FlexContents>
          {type === 'serviceError' && <ServiceError />}
          {type === 'findAddressOverTen' && (
            <>
              <PreviouslyEnteredAddress
                firstLine="동탄시범다은마을 월드메르디앙 반도유보라 아파트 333동"
                secondLine="경기도 화성시 동탄중앙로 189"
              />
              <MarginTopThirtyTwo />
              <LineWrraper>
                <Line />
              </LineWrraper>
              <MarginTopThirtyTwo />
            </>
          )}
          {type === 'notFoundAddress' && (
            <>
              <PreviouslyEnteredAddress
                firstLine="동탄시범다은마을 월드메르디앙 반도유보라 아파트 333동"
                secondLine="경기도 화성시 동탄중앙로 189"
              />
              <MarginTopThirtyTwo />
              <LineWrraper>
                <Line />
              </LineWrraper>
              <MarginTopThirtyTwo />
              <Notice />
            </>
          )}
        </FlexContents>

        <Ctas type={type} handleClick={() => {}} />
      </Container>

      {openPopup && <NeedConfirmAddressPopup handleConfirm={handleClosePopup} />}
    </>
  );
}
