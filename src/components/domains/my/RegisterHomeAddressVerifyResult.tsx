import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import {
  MarginTopEighty,
  MarginTopFourty,
  MarginTopSixty,
  MarginTopThirtyTwo,
  MarginTopTwenty,
} from '@/components/atoms/Margin';

import { VerifyStatus } from '@/constants/enums';

import SuccessIcon from '@/assets/icons/success_verify_address.svg';

import usePopupsHandler from './register-home-address-verify-result/hooks/usePopupsHandler';

import useHandleClickBack from './register-home-address-verify-result/hooks/useHandleClickBack';

import useResultType from './register-home-address-verify-result/hooks/useResultType';

import useRegisterHomeAddressVerifyResultHandler from './register-home-address-verify-result/hooks/useRegisterHomeAddressVerifyResultHandler';

import ResultMessage from './register-home-address-verify-result/ResultMessage';

import Notice from './register-home-address-verify-result/Notice';

import Ctas from './register-home-address-verify-result/Ctas';

import { Contents } from './register-home-address-verifying/widget/RegisterHomeAddressVerifyingWidget';

import {
  LineWrraper,
  Line,
} from '../realestate-helper/realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

import ServiceError from '../realestate-helper/realestate-document-verify-result/ServiceError';

import PreviouslyEnteredAddress from '../realestate-helper/realestate-document-verify-result/PreviouslyEnteredAddress';

import { ListWrraper } from '../realestate-helper/realestate-document-verify-result/widget/RealestateDocumentVerifyResultWidget';

import ListItem from '../realestate-helper/realestate-document-verify-result/ListItem';

const AlreadyExistAddressPopup = dynamic(
  () => import('./register-home-address-verify-result/popups/AlreadyExistAddressPopup'),
  { ssr: false },
);

const InvalidAccessPopup = dynamic(() => import('@/components/organisms/popups/InvalidAccessPopup'), {
  ssr: false,
});

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 h-full overflow-x-hidden overflow-y-auto`}
`;

export default function RegisterHomeAddressVerifyResult() {
  const { popup, handleOpenPopup, handleRedirectHome, handleRedirectRegisteredMyHome } = usePopupsHandler();

  const { type, handleUpdateType } = useResultType({ handleOpenPopup });

  const { handleClickBack } = useHandleClickBack();

  const {
    ownerShipLoading,
    verifyStatus,
    verifyCompletedSeconds,
    title,
    subTitle,
    addressList,
    selectedItemID,
    handleClickListItem,
    handleClickCtasIfServiceErrorOrNotFoundAddress,
    handleClickCtsaIfFindAddressOverTen,
  } = useRegisterHomeAddressVerifyResultHandler({ type, handleUpdateType, handleOpenPopup });

  if (verifyStatus === VerifyStatus.Success) {
    return (
      <Container>
        <MarginTopSixty />
        <Contents>
          <div>우리집 등록이 완료 되었습니다!</div>
          <div>{verifyCompletedSeconds}초 후 화면이 전환됩니다.</div>
          <MarginTopEighty />
          <div>
            {(verifyStatus === VerifyStatus.Success || verifyStatus === VerifyStatus.Completed) && <SuccessIcon />}
          </div>
          <MarginTopEighty />
        </Contents>
      </Container>
    );
  }

  return (
    <>
      <Container>
        {(type === 'findAddressOverTen' || type === 'notFoundAddress') && (
          <NavigationHeader>
            <NavigationHeader.BackButton onClick={handleClickBack} />
            <NavigationHeader.Title>우리집 등록</NavigationHeader.Title>
          </NavigationHeader>
        )}

        <ResultMessage type={type} />
        <FlexContents>
          {(type === 'findAddressOverTen' || type === 'notFoundAddress') && <MarginTopFourty />}

          {type === 'serviceError' && <ServiceError />}

          {type === 'findAddressOverTen' && (
            <>
              <PreviouslyEnteredAddress firstLine={title} secondLine={subTitle} />
              <MarginTopThirtyTwo />
              <LineWrraper>
                <Line />
              </LineWrraper>
              <MarginTopThirtyTwo />
              <Notice firstLine="주소지 확인이 필요합니다." secondLine="주소지 확인이 필요합니다." />
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
              <Notice
                firstLine="주소지 확인이 필요합니다."
                secondLine="신축/재건축으로 등기부 조회가 불가한 주택은 매물등록을 할 수 없습니다."
              />
              <MarginTopTwenty />
            </>
          )}
        </FlexContents>
        <Ctas
          type={type}
          disabled={type === 'findAddressOverTen' ? (!selectedItemID ? true : !!ownerShipLoading) : false}
          handleClick={
            type === 'findAddressOverTen'
              ? handleClickCtsaIfFindAddressOverTen
              : handleClickCtasIfServiceErrorOrNotFoundAddress
          }
        />
      </Container>

      {popup === 'invalidAccess' && (
        <InvalidAccessPopup message="유효하지 않은 접근입니다." handleConfirm={handleRedirectHome} />
      )}

      {popup === 'alreadyExistAddress' && <AlreadyExistAddressPopup handleConfirm={handleRedirectRegisteredMyHome} />}
    </>
  );
}
