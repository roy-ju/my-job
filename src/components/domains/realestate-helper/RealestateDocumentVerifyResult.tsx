import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

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

import useVerfiyAddressResultHandler from './realestate-document-verify-result/hooks/useVerfiyAddressResultHandler';

import usePopupsHandler from './realestate-document-verify-result/hooks/usePopupsHandler';

const NeedConfirmAddressPopup = dynamic(
  () => import('./realestate-document-verify-result/popups/NeedConfirmAddressPopup'),
  { ssr: false },
);

const RemainingCountZeroPopup = dynamic(
  () => import('./realestate-document-verifying/popups/RemainingCountZeroPopup'),
  { ssr: false },
);

const StartCreateDocumentPopup = dynamic(
  () => import('./realestate-document-verifying/popups/StartCreateDocumentPopup'),
  { ssr: false },
);

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 h-full overflow-x-hidden overflow-y-auto`}
`;

export default function RealestateDocumentVerifyResult() {
  const {
    popup,
    handleOpenPopup,
    handleClosePopup,
    handleConfirmStartCreateDocumentPopup,
    handleRedirectRealestateDocumentList,
  } = usePopupsHandler();

  const { type } = useResultType({ handleOpenPopup });

  const { handleClickBack } = useHandleClickBack();

  const { handleSearchOtherAddress, handleClickCtasIfServiceErrorOrNotFoundAddress } = useCtasHandler({ type });

  const { title, subTitle, addressList, selectedItemID, handleClickListItem, handleClickCtsaIfFindAddressOverTen } =
    useVerfiyAddressResultHandler({ handleOpenPopup });

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

        <FlexContents>
          {type === 'serviceError' && <ServiceError />}
          {(type === 'findAddressOverTen' || type === 'notFoundAddress') && <MarginTopFourty />}
          {type === 'findAddressOverTen' && (
            <>
              <PreviouslyEnteredAddress firstLine={title} secondLine={subTitle} />
              <MarginTopThirtyTwo />
              <LineWrraper>
                <Line />
              </LineWrraper>
              <MarginTopThirtyTwo />
              <SelectAddressHeader handleClick={handleSearchOtherAddress} />
              <MarginTopTwenty />
              <ListWrraper>
                {addressList?.map((item) => (
                  <ListItem
                    key={item.realestate_unique_number}
                    firstLine={item?.full_road_name_address ?? ''}
                    secondLine={item?.address_detail ?? ''}
                    handleClickItem={() => handleClickListItem(item.realestate_unique_number)}
                    selected={selectedItemID === item.realestate_unique_number}
                  />
                ))}
              </ListWrraper>
            </>
          )}
          {type === 'notFoundAddress' && (
            <>
              <PreviouslyEnteredAddress firstLine={title} secondLine={subTitle} />
              <MarginTopThirtyTwo />
              <LineWrraper>
                <Line />
              </LineWrraper>
              <MarginTopThirtyTwo />
              <Notice />
            </>
          )}
        </FlexContents>
        <Ctas
          type={type}
          disabled={type === 'findAddressOverTen' ? !selectedItemID : false}
          handleClick={
            type === 'findAddressOverTen'
              ? handleClickCtsaIfFindAddressOverTen
              : handleClickCtasIfServiceErrorOrNotFoundAddress
          }
        />
      </Container>

      {popup === 'needConfirmAddressPopup' && <NeedConfirmAddressPopup handleConfirm={handleClosePopup} />}

      {popup === 'remainingCountZeroPopup' && (
        <RemainingCountZeroPopup handleConfirm={handleRedirectRealestateDocumentList} />
      )}

      {popup === 'startCreateDocumentPopup' && (
        <StartCreateDocumentPopup handleConfirm={handleConfirmStartCreateDocumentPopup} />
      )}
    </>
  );
}
