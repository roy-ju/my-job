import dynamic from 'next/dynamic';

import tw from 'twin.macro';

import Container from '@/components/atoms/Container';

import { MarginTopTwentyFour } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import { makeAddressDetail } from '@/utils/fotmat';

import { MyAddressStatus } from '@/constants/enums';

import useHandleClickBack from './registered-homes/hooks/useHandleClickBack';

import useRegisteredMyHomesHandler from './registered-homes/hooks/useRegisteredMyHomesHandler';

import {
  ListItemBorderWrraper,
  RegisteredHomeListWrraper,
  RegisteredHomesTitle,
} from './registered-homes/widget/RegisteredHomesWidget';

import ListItem from './registered-homes/ListItem';

import Ctas from './registered-homes/Ctas';

const InActivePopup = dynamic(() => import('./registered-homes/popups/InActivePopup'), { ssr: false });

const ConfirmDeletePopup = dynamic(() => import('./registered-homes/popups/ConfirmDeletePopup'), { ssr: false });

export default function MyRegisteredHomes() {
  const { renderBackButtonUi, handleClickBack } = useHandleClickBack();

  const {
    list,
    popup,
    userAddressInfo,
    handleOpenConfirmDeletePopup,
    handleSendSms,
    handleRegisterMyAddress,
    handleClickMyPage,
    handleDeleteMyAddress,
    handleCloseConfirmDeletePopup,
  } = useRegisteredMyHomesHandler();

  return (
    <>
      <Container>
        <NavigationHeader>
          {renderBackButtonUi && <NavigationHeader.BackButton onClick={handleClickBack} />}
          <NavigationHeader.Title tw="text-b1">우리집 정보</NavigationHeader.Title>
        </NavigationHeader>

        <MarginTopTwentyFour />
        <RegisteredHomesTitle>집주인 인증된 우리집 목록</RegisteredHomesTitle>
        <MarginTopTwentyFour />

        <RegisteredHomeListWrraper>
          {list &&
            list.length > 0 &&
            list.map((item, index) => (
              <ListItemBorderWrraper key={item.id} css={[index === list.length - 1 && tw`border-b-0`]}>
                <ListItem
                  roadnameAddress={item.road_name_address || ''}
                  addressDetail={makeAddressDetail({ danjiName: item.danji_name, dong: item.dong, ho: item.ho })}
                  notVerified={item.status === MyAddressStatus.WaitingForOwnerAgreement}
                  onClickDeleteIcon={() => handleOpenConfirmDeletePopup(item)}
                  onClickSendSMS={() =>
                    handleSendSms(
                      item.id,
                      item?.road_name_address || '',
                      makeAddressDetail({ danjiName: item.danji_name, dong: item.dong, ho: item.ho }),
                    )
                  }
                />
              </ListItemBorderWrraper>
            ))}
        </RegisteredHomeListWrraper>
        <Ctas handleClick={handleRegisterMyAddress} />
      </Container>
      {popup === 'inActivePopup' && <InActivePopup handleConfirm={handleClickMyPage} />}
      {popup === 'deleteConfirm' && userAddressInfo?.address && userAddressInfo?.id && (
        <ConfirmDeletePopup
          address={userAddressInfo.address}
          handleConfirm={handleDeleteMyAddress}
          handleCancel={handleCloseConfirmDeletePopup}
        />
      )}
    </>
  );
}
