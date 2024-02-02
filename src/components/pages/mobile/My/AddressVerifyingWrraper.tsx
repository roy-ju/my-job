/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { MobMyAddressVerifying } from '@/components/templates';

import useAuth from '@/hooks/services/useAuth';

import { MyVerifyStatus } from '@/constants/enums';

import ErrorCodes from '@/constants/error_codes';

import { KakaoAddressAutocompleteResponseItem } from '@/hooks/services/useKakaoAddressAutocomplete';

import { searchAddress } from '@/lib/kakao/search_address';

import verifyAddress from '@/apis/my/verifyAddress';

import verifyOwnership from '@/apis/my/verifyOwnership';

import Routes from '@/router/routes';

export default function AddressVerifyingWrraper() {
  const router = useRouter();

  const { mutate } = useAuth();

  const [verifyStatus, setVerifyStatus] = useState<number>(MyVerifyStatus.None);

  const [verifyingSeconds, setVerifyingSeconds] = useState<number>(30);

  const [verifyCompletedSeconds, setVerifyCompletedSeconds] = useState<number>(2);

  const [popup, setPopup] = useState<'alreadyExistAddress' | 'verifiedCountReachedLimit' | ''>('');

  const handleClosePopup = useCallback(() => {
    setPopup('');

    router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
  }, [router]);

  const verify = useCallback(async () => {
    const { addressData: inAddressData, dong, ho } = router.query;

    if (!inAddressData) {
      router.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.MyAddress}`,
      });
      return;
    }

    const addressData = JSON.parse(inAddressData as string) as KakaoAddressAutocompleteResponseItem;

    setVerifyStatus(MyVerifyStatus.Ing);

    const res = await verifyAddress({
      jibun_address: addressData.addressName,
      road_name_address: addressData.roadAddressName,
      dong: dong ? `${(dong as string).replaceAll('동', '')}` : '',
      ho: ho ? `${(ho as string).replaceAll('호', '')}` : '',
    });

    if (res?.error_code === ErrorCodes.CANNOT_VERIFIED_COUNT_REACHED_LIMIT) {
      setPopup('verifiedCountReachedLimit');
      return;
    }

    if (res?.error_code === ErrorCodes.ALREADY_REGISTERED_ADDRESS) {
      setPopup('alreadyExistAddress');
      return;
    }

    if (
      res?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI ||
      res?.error_code === ErrorCodes.INACCURATE_ADDRESS_DETAIL
    ) {
      router.replace(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
          query: {
            ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
            ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
            ...(dong ? { dong: `${(dong as string).replaceAll('동', '')}` } : {}),
            ...(ho ? { ho: `${(ho as string).replaceAll('호', '')}` } : {}),
            errorCode: `${res.error_code}`,
          },
        },
        `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
      );

      return;
    }

    if (res?.address_list?.length && res.address_list.length > 1) {
      router.replace(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
          query: {
            ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
            ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
            ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
            ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
            ...(dong ? { dong: `${(dong as string).replaceAll('동', '')}` } : {}),
            ...(ho ? { ho: `${(ho as string).replaceAll('호', '')}` } : {}),
            addressList: encodeURIComponent(JSON.stringify(res.address_list)),
          },
        },
        `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
      );

      return;
    }

    if (res?.address_list?.length === 1) {
      const verifiedAddress = res.address_list[0];
      const res2 = await searchAddress(addressData.roadAddressName);

      if (res2 && res2?.documents[0].address?.b_code) {
        const response = await verifyOwnership({
          realestate_unique_number: verifiedAddress.realestate_unique_number,
          address_detail: verifiedAddress.address_detail,
          bubjungdong_code: res2.documents[0].address.b_code,
          jibun_address: res2.documents[0].address.address_name,
          building_name: addressData.placeName,
          eubmyundong: res2.documents[0].address.region_3depth_name,
          lat: addressData.lat,
          long: addressData.lng,
          li: '',
          road_name_address: addressData.roadAddressName,
          sido: res2.documents[0].address.region_1depth_name,
          sigungu: res2.documents[0].address.region_2depth_name,
        });

        if (response?.error_code === ErrorCodes.ALREADY_REGISTERED_ADDRESS) {
          setPopup('alreadyExistAddress');

          return;
        }

        if (
          response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI ||
          response?.error_code === ErrorCodes.SYSTEM_ERROR_OUTERAPI2
        ) {
          router.replace(
            {
              pathname: `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
              query: {
                ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
                ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
                ...(router?.query?.suggestID ? { suggestID: router?.query?.suggestID } : {}),
                ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
                ...(dong ? { dong: `${(dong as string).replaceAll('동', '')}` } : {}),
                ...(ho ? { ho: `${(ho as string).replaceAll('호', '')}` } : {}),
                errorCode: `${ErrorCodes.SYSTEM_ERROR_OUTERAPI}`,
              },
            },
            `/${Routes.EntryMobile}/${Routes.MyAddressVerifyResult}`,
          );

          return;
        }

        if (response?.verified === true) {
          await setVerifyStatus(MyVerifyStatus.Success);

          setTimeout(() => {
            mutate();
            toast.success('우리집 등록이 완료 되었습니다!');

            router.replace(`/${Routes.EntryMobile}/${Routes.MyRegisteredHomes}`);
          }, 1000);

          return;
        }

        if (response?.verified === false) {
          await mutate();

          router.replace({
            pathname: `/${Routes.EntryMobile}/${Routes.MyAddressAgreement}`,
            query: {
              ...(router?.query?.origin ? { origin: router.query.origin as string } : {}),
              ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
              ...(router?.query?.addressData ? { addressData: router.query.addressData as string } : {}),
              ...(dong ? { dong: `${(dong as string).replaceAll('동', '')}` } : {}),
              ...(ho ? { ho: `${(ho as string).replaceAll('호', '')}` } : {}),
              userAddressID: `${response?.user_address_id}`,
            },
          });
        }
      }
    } else {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [router]);

  useEffect(() => {
    if (verifyStatus === MyVerifyStatus.Ing) {
      if (verifyingSeconds === 0) return;

      const interval = setInterval(() => {
        setVerifyingSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [verifyStatus, verifyingSeconds]);

  useEffect(() => {
    if (verifyStatus === MyVerifyStatus.Success) {
      if (verifyCompletedSeconds === 0) return;

      const interval = setInterval(() => {
        setVerifyCompletedSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [verifyStatus, verifyCompletedSeconds]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <>
      <MobMyAddressVerifying
        verifyStatus={verifyStatus}
        verifyingSeconds={verifyingSeconds}
        verifyCompletedSeconds={verifyCompletedSeconds}
      />

      {(popup === 'alreadyExistAddress' || popup === 'verifiedCountReachedLimit') && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              {popup === 'verifiedCountReachedLimit' && (
                <Popup.SmallTitle tw="text-center">
                  주소 정보 확인은
                  <br />
                  하루 최대 5회까지 할 수 있습니다.
                  <br />
                  내일 다시 시도해주세요.
                </Popup.SmallTitle>
              )}
              {popup === 'alreadyExistAddress' && (
                <Popup.SmallTitle tw="text-center">
                  동일한 주소지로
                  <br />
                  우리집 등록이 되어있습니다.
                </Popup.SmallTitle>
              )}
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={handleClosePopup}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
