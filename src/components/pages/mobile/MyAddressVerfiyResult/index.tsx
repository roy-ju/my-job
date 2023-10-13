import { MobileContainer } from '@/components/atoms';
import { useAuth } from '@/hooks/services';
import { useRouter } from 'next/router';
import React, { memo, useState, useEffect, useCallback } from 'react';
import { OverlayPresenter, Popup } from '@/components/molecules';
import Routes from '@/router/routes';
import { MyVerifyStatus } from '@/constants/enums';
import { searchAddress } from '@/lib/kakao/search_address';
import verifyOwnership from '@/apis/my/verifyOwnership';
import ErrorCodes from '@/constants/error_codes';
import { toast } from 'react-toastify';
import { MyAddressVerifying, MyAddressVerifyResult } from '@/components/templates';

type AddressData = {
  addressName?: string;
  categoryName?: string;
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  roadAddressName?: string;
};

type AddressListItem = {
  address_detail?: string;
  full_road_name_address?: string;
  realestate_unique_number?: string;
};

export default memo(() => {
  const router = useRouter();

  const { mutate } = useAuth();

  const [addressData, setAddressData] = useState<AddressData>();
  const [addressList, setAddressList] = useState<AddressListItem[]>();
  const [errorCode, setErrorCode] = useState<string>();
  const [selectedItemID, setSelectedItemID] = useState<string>();

  const [popup, setPopup] = useState<'alreadyExistAddress' | 'invalidAccess' | ''>('');

  const [dong, setDong] = useState<string>('');
  const [ho, setHo] = useState<string>('');

  const [verifyStatus, setVerifyStatus] = useState<number>(MyVerifyStatus.None);
  const [verifyCompletedSeconds, setVerifyCompletedSeconds] = useState<number>(2);

  const reset = useCallback(() => {
    setAddressData(undefined);
    setAddressList(undefined);
    setSelectedItemID(undefined);
    setDong('');
    setHo('');
    setVerifyStatus(MyVerifyStatus.None);
    setVerifyCompletedSeconds(2);
  }, []);

  const handleGoMyPage = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
  }, [router]);

  const handleGoMyAddress = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
  }, [router]);

  const handleClickMultipleItem = useCallback(
    (id?: string) => {
      if (id === selectedItemID) {
        setSelectedItemID(undefined);
        return;
      }
      setSelectedItemID(id);
    },
    [selectedItemID],
  );

  const handleClosePopup = useCallback(
    (value: 'alreadyExistAddress' | 'invalidAccess') => {
      setPopup('');
      if (value === 'alreadyExistAddress') {
        router.replace(`/${Routes.EntryMobile}`);
      }
      if (value === 'invalidAccess') {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
      }
    },
    [router],
  );

  const handleClickMultipleItemCTA = useCallback(
    async (id?: string) => {
      const selectedAddress = addressList?.filter((ele) => ele.realestate_unique_number === id)[0];

      if (selectedAddress && addressData?.roadAddressName) {
        const responseKakao = await searchAddress(addressData.roadAddressName);

        if (
          responseKakao &&
          responseKakao.documents[0].address?.b_code &&
          selectedAddress.realestate_unique_number &&
          selectedAddress.address_detail &&
          addressData.lat &&
          addressData.lng
        ) {
          const response = await verifyOwnership({
            realestate_unique_number: selectedAddress.realestate_unique_number,
            address_detail: selectedAddress.address_detail,
            bubjungdong_code: responseKakao.documents[0].address.b_code,
            jibun_address: responseKakao.documents[0].address.address_name,
            building_name: responseKakao.documents[0].road_address?.building_name ?? '',
            eubmyundong: responseKakao.documents[0].address.region_3depth_name,
            lat: addressData.lat,
            long: addressData.lng,
            li: '',
            road_name_address: addressData.roadAddressName,
            sido: responseKakao.documents[0].address.region_1depth_name,
            sigungu: responseKakao.documents[0].address.region_2depth_name,
          });

          if (response?.error_code === ErrorCodes.ALREADY_REGISTERED_ADDRESS) {
            setPopup('alreadyExistAddress');

            return;
          }

          if (
            response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI ||
            response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI2
          ) {
            setErrorCode(ErrorCodes.SYSTEM_ERROR_OUTERAPI.toString());
            reset();

            return;
          }

          if (response?.verified === true) {
            await setVerifyStatus(MyVerifyStatus.Success);

            setTimeout(() => {
              mutate();
              toast.success('우리집 등록이 완료 되었습니다!');
              router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredHomes}`);
            }, 1500);

            return;
          }

          if (response?.verified === false) {
            mutate();
            setErrorCode('');

            router.replace(
              {
                pathname: `/${Routes.EntryMobile}/${Routes.MyAddressAgreement}`,
                query: {
                  addressData: router.query.addressData as string,
                  addressDetail: selectedAddress.address_detail,
                  userAddressID: `${response?.user_address_id}`,
                  dong: dong ? `${(dong as string).replaceAll('동', '')}` : '',
                  ho: ho ? `${(ho as string).replaceAll('호', '')}` : '',
                },
              },
              `/${Routes.EntryMobile}/${Routes.MyAddressAgreement}`,
            );
          }
        }
      }
    },
    [addressList, addressData, reset, mutate, router, dong, ho],
  );

  const handleClickBack = useCallback(() => {
    if (
      errorCode === ErrorCodes.SYSTEM_ERROR_OUTERAPI.toString() ||
      errorCode === ErrorCodes.SYSTEM_ERROR_OUTERAPI2.toString()
    ) {
      router.replace(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
      return;
    }

    if (errorCode === ErrorCodes.INACCURATE_ADDRESS_DETAIL.toString()) {
      router.replace(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
      return;
    }

    if (addressList && addressList.length > 1) {
      router.replace(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
    }
  }, [addressList, errorCode, router]);

  useEffect(() => {
    if (!router?.query?.addressData) {
      return;
    }

    if (router?.query?.addressData) {
      const addressD = JSON.parse(decodeURIComponent(router.query.addressData as string));
      setAddressData(addressD);
    }

    if (router?.query?.addressList) {
      const addressLi = JSON.parse(decodeURIComponent(router.query.addressList as string));
      setAddressList(addressLi);
    }

    if (router?.query?.errorCode) {
      setErrorCode(router.query.errorCode as string);
    }

    if (router?.query?.dong) {
      setDong(router.query.dong as string);
    }

    if (router?.query?.ho) {
      setHo(router.query.ho as string);
    }
  }, [router]);

  useEffect(() => {
    if (verifyStatus === MyVerifyStatus.Success) {
      if (verifyCompletedSeconds === 0) return;

      const interval = setInterval(() => {
        setVerifyCompletedSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [verifyStatus, verifyCompletedSeconds]);

  return (
    <MobileContainer>
      {verifyStatus !== MyVerifyStatus.Success && (
        <MyAddressVerifyResult
          onClickBack={handleClickBack}
          addressData={addressData}
          addressList={addressList}
          dong={dong}
          ho={ho}
          errorCode={errorCode}
          selectedItemID={selectedItemID}
          onClickSystemErrorCTA={handleGoMyPage}
          onClickInaccurateAddressDetailCTA={handleGoMyAddress}
          onClickMultipleItem={handleClickMultipleItem}
          onClickMultipleItemCTA={handleClickMultipleItemCTA}
        />
      )}

      {verifyStatus === MyVerifyStatus.Success && (
        <MyAddressVerifying verifyStatus={verifyStatus} verifyCompletedSeconds={verifyCompletedSeconds} />
      )}

      {popup === 'invalidAccess' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">유효하지 않은 접근입니다.</Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => handleClosePopup('invalidAccess')}>
                네고시오 홈으로 돌아가기
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {popup === 'alreadyExistAddress' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.SmallTitle tw="text-center">
                동일한 주소지로
                <br />
                우리집 등록이 되어있습니다.
              </Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => handleClosePopup('alreadyExistAddress')}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
