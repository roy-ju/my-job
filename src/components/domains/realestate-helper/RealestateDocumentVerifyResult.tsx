import tw, { styled } from 'twin.macro';

import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import { MarginTopFourty, MarginTopThirtyTwo, MarginTopTwenty } from '@/components/atoms/Margin';

import { Line, LineWrraper } from './realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

import useHandleClickBack from './realestate-document-verify-result/hooks/useHandleClickBack';

import useResultType from './realestate-document-verify-result/hooks/useResultType';

import useCtasHandler from './realestate-document-verify-result/hooks/useCtasHandler';

import ResultMessage from './realestate-document-verify-result/ResultMessage';

import ServiceError from './realestate-document-verify-result/ServiceError';

import Notice from './realestate-document-address-detail/Notice';

import PreviouslyEnteredAddress from './realestate-document-verify-result/PreviouslyEnteredAddress';

import SelectAddressHeader from './realestate-document-verify-result/SelectAddressHeader';

import Ctas from './realestate-document-verify-result/Ctas';
import ListItem from './realestate-document-verify-result/ListItem';
import { ListWrraper } from './realestate-document-verify-result/widget/RealestateDocumentVerifyResultWidget';

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

  const { handleSearchOtherAddress, handleClickCtas } = useCtasHandler({ type });

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
              <SelectAddressHeader handleClick={handleSearchOtherAddress} />
              <MarginTopTwenty />
              <ListWrraper>
                <ListItem
                  firstLine="동탄시범다은마을 월드메르디앙 반도유보라 아파트 333동"
                  secondLine="경기도 화성시 동탄중앙로 189"
                  handleClickItem={() => {}}
                  selected
                />
                <ListItem
                  firstLine="동탄시범다은마을 월드메르디앙 반도유보라 아파트 333동"
                  secondLine="경기도 화성시 동탄중앙로 189"
                  handleClickItem={() => {}}
                />
                <ListItem
                  firstLine="동탄시범다은마을 월드메르디앙 반도유보라 아파트 333동"
                  secondLine="경기도 화성시 동탄중앙로 189"
                  handleClickItem={() => {}}
                />
                <ListItem
                  firstLine="동탄시범다은마을 월드메르디앙 반도유보라 아파트 333동"
                  secondLine="경기도 화성시 동탄중앙로 189"
                  handleClickItem={() => {}}
                />
                <ListItem
                  firstLine="동탄시범다은마을 월드메르디앙 반도유보라 아파트 333동"
                  secondLine="경기도 화성시 동탄중앙로 189"
                  handleClickItem={() => {}}
                />
              </ListWrraper>
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
        <Ctas type={type} handleClick={handleClickCtas} />
      </Container>
      {openPopup && <NeedConfirmAddressPopup handleConfirm={handleClosePopup} />}
    </>
  );
}
